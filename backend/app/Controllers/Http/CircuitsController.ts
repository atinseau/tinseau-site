import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Circuit from "App/Models/Circuit"

export default class CircuitsController {
	public async index() {
		return await Circuit
			.query()
			.preload('events', (eventQuery) => eventQuery
				.preload('locations', (locationQuery) => locationQuery.preload('car'))
				.preload('track_access')
			)
	}

	public async events() {
		return await Circuit
			.query()
			.whereHas('events', (query) => query.where('events.id', '!=', "NULL"))
			.preload('events', (eventQuery) => eventQuery
				.preload('locations', (locationQuery) => locationQuery.preload('car'))
				.preload('track_access')
			)
	}

	public async create(ctx: HttpContextContract) {
		const newCircuitCreateSchema = schema.create({
			name: schema.string(),
			description: schema.string()
		})
		const body = await ctx.request.validate({ schema: newCircuitCreateSchema })
		return await Circuit.create(body)
	}

	public async deleteAll() {
		return await Circuit.query().delete()
	}
}
