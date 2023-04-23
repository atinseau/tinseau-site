import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from "@ioc:Adonis/Core/Validator"

import DechargesGenerator from 'App/Services/Decharges'

import Drive from "@ioc:Adonis/Core/Drive"

import sharp from "sharp"
import { optimize, OptimizedSvg } from 'svgo'
import Decharge from 'App/Models/Decharge'
import File from 'App/Models/File'
import UserCar from 'App/Models/UserCar'
import { getFileUrl } from '../../../utils'

export default class DechargesController {

	// DEBUG

	public async all() {
		return await Decharge.query()
			.preload('file')
	}

	public async deleteAll() {
		return (await Decharge.all())
			.map((decharge) => decharge.delete())
	}


	// AUTH

	public async index(ctx: HttpContextContract) {
		const user = ctx.auth.user
		const decharges = await user?.related('decharges')
			.query()
			.preload('file')
		if (decharges) {
			for (const decharge of decharges) {
				if (decharge.type === "track_access")
					decharge.data.car = await UserCar.query().where('id', decharge.data.car_id).preload('images').first()
			}
		}
		return decharges
	}


	public async createDecharge(ctx: HttpContextContract) {
		const user = ctx.auth.user!
		const body = await DechargesGenerator.validate(ctx.request.body())

		let decharge: Decharge | undefined

		try {
			const svg = (optimize(body.signature, { multipass: true }) as OptimizedSvg)
				.data.replace(' style="width:100%;height:100%"', '')

			const buffer = await DechargesGenerator.createDecharge({
				...body,
				skeleton: false,
				signature: await sharp(Buffer.from(svg)).png().trim().toBuffer()
			})

			decharge = await user.related('decharges').create({
				type: body.type,
				data: body.data,
				expiration: new Date(`12-31-${new Date().getFullYear()}`)
			})

			const dechargeIdentifier = (new Date().getTime() + " " + body.data.fullname).replace(/ /g, "_").toLowerCase() + ".pdf"

			await Drive.put("/decharges/" + dechargeIdentifier, buffer, {
				contentType: "application/pdf"
			})

			const file = await File.create({
				url: getFileUrl("/decharges/" + dechargeIdentifier),
				description: "Decharge: " + body.data.fullname,
				title: "Decharge de responsabilité",
				metadata: {
					drive: "local",
					type: "pdf",
					identifier: dechargeIdentifier
				}
			})
			await decharge.related('file').associate(file)
			return decharge
		} catch (e) {

			console.log(e)

			if (decharge)
				await decharge.delete()
			ctx.response.badRequest({
				error: e.message
			})
		}
	}

	public async downloadDecharge(ctx: HttpContextContract) {
		const body = await ctx.request.validate({
			schema: schema.create({
				type: schema.enum(DechargesGenerator.types)
			})
		})
		const { id } = ctx.params
		ctx.response.header("Content-Type", "application/pdf")
		if (!id) {
			const buffer = await DechargesGenerator.createDecharge({
				type: body.type,
				skeleton: true
			})
			return buffer
		} else {
			const decharge = await Decharge
				.query()
				.where('id', id)
				.preload('file')
				.first()
			if (!decharge) {
				return ctx.response.notFound({
					error: "La decharge n'existe pas"
				})
			}
			return await Drive.get('/decharges/' + decharge.file.metadata.identifier as string)
		}
	}

	public async deleteDecharge(ctx: HttpContextContract) {
		const decharge = await Decharge.find(ctx.params.id)
		if (!decharge) {
			return ctx.response.notFound({
				error: "La decharge n'existe pas"
			})
		}
		await decharge.delete()
		return decharge
	}

}
