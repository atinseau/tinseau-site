import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { createNameDescValidation, imageOptionalValidation, imageRequiredValidation, updateNameDescValidation } from 'App/Functions/validators'

import Circuit from "App/Models/Circuit"
import Image from 'App/Models/Image'

export default class CircuitsController {
	public async index() {
		return await Circuit
			.query()
			.preload('events', (eventQuery) => eventQuery
				.preload('locations', (locationQuery) => locationQuery.preload('car', (carQuery) => carQuery
					.preload('images')
				))
				.preload('track_access')
			)
			.preload('logo')
	}

	public async events() {
		return (await this.index())
			.filter((circuit) => circuit.events.length > 0)
	}

	public async create(ctx: HttpContextContract) {
		const newCircuitCreateSchema = schema.create({...createNameDescValidation, ...imageRequiredValidation})
		const {image: imageId, ...body} = await ctx.request.validate({ schema: newCircuitCreateSchema })
		const circuit = await Circuit.create(body)
		const image = await Image.find(imageId)

		if (!image) {
			await circuit.delete()
			ctx.response.notFound({
				message: "Image not found"
			})
			return
		}

		await circuit.related('logo').associate(image)
		return circuit
	}

	public async update(ctx: HttpContextContract) {
		const { id } = ctx.params

		const updateCircuitSchema = schema.create({...updateNameDescValidation, ...imageOptionalValidation})
		const body = await ctx.request.validate({ schema: updateCircuitSchema })

		const circuit = await Circuit.findOrFail(id)
		if (body.name) circuit.name = body.name
		if (body.description) circuit.description = body.description
		if (body.image) {
			await circuit.related('logo').dissociate()
			const image = await Image.find(body.image)
			if (!image) {
				ctx.response.notFound({
					message: "Image not found"
				})
				return
			}
			await circuit.related('logo').associate(image)
		}
		await circuit.save()
	}

	public async deleteAll() {
		return await Circuit.query().delete()
	}
}
