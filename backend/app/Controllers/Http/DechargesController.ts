import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DechargesGenerator from 'App/Services/Decharges'

import Drive from "@ioc:Adonis/Core/Drive"

import sharp from "sharp"
import { optimize, OptimizedSvg } from 'svgo'
import Decharge from 'App/Models/Decharge'
import File from 'App/Models/File'

export default class DechargesController {

	public async all() {
		return await Decharge.query()
			.preload('file')
	}

	public async index(ctx: HttpContextContract) {
		const user = ctx.auth.user
		const decharges = await user?.related('decharges')
			.query()
			.preload('file')

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
				signature: await sharp(Buffer.from(svg)).png().trim().toBuffer()
			})


			decharge = await user.related('decharges').create({
				type: body.type,
				data: body.data,
				expiration: new Date(`12-31-${new Date().getFullYear()}`)
			})

			const dechargeIdentifier = (new Date().getTime() + " " + body.data.fullname).replace(/ /g, "_").toLowerCase() + ".pdf"
			const bucket = Drive.use('s3').bucket("tinseau-decharge")

			await bucket.put(dechargeIdentifier, buffer, {
				contentType: "application/pdf"
			})

			const file = await File.create({
				url: await bucket.getUrl(dechargeIdentifier),
				description: "Decharge: " + body.data.fullname,
				title: "Decharge de responsabilité",
				metadata: {
					drive: "s3",
					type: "pdf",
					bucket: "tinseau-decharge",
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
		const buffer = await DechargesGenerator.createDecharge({
			type: "additionnal_driver"
		})
		ctx.response.header("Content-Type", "application/pdf")
		return buffer
	}

	public async deleteAll() {
		return (await Decharge.all())
			.map((decharge) => decharge.delete())
	}
}
