import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from "@ioc:Adonis/Core/Validator"

import Car from "App/Models/Car";

export default class CarsController {

	public async index() {
		const cars = await Car.query().preload('locations')
		return cars
	}

	public async create(ctx: HttpContextContract) {
		const newCarCreateSchema = schema.create({
			name: schema.string(),
			description: schema.string()
		})
		const body = await ctx.request.validate({ schema: newCarCreateSchema })
		return await Car.create(body)
	}

	public async deleteAll() {
		return await Car.query().delete()
	}

}
