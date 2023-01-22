import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from "@ioc:Adonis/Core/Validator"
import { createNameDescValidation, imagesOptionalValidation, imagesRequiredValidation, updateNameDescValidation } from 'App/Functions/validators';

import Car from "App/Models/Car";

export default class CarsController {

	public async index() {
		const cars = await Car.query()
			.preload('locations')
			.preload('images')

		return cars
	}

	public async create(ctx: HttpContextContract) {
		const NewCarSchema = schema.create({...createNameDescValidation, ...imagesRequiredValidation})
		const { images, ...body } = await ctx.request.validate({ schema: NewCarSchema })
		const car = await Car.create(body)

		try {
			await car.related('images').attach(images)
		} catch (e) {
			ctx.response.notFound({
				message: "Une ou plusieurs images n'existent pas"
			})
			await car.delete()
			return
		}
		return car
	}

	public async update(ctx: HttpContextContract) {
		const UpdateCarSchema = schema.create({...updateNameDescValidation, ...imagesOptionalValidation})
		const { id } = ctx.params
		const body = await ctx.request.validate({ schema: UpdateCarSchema })
		const car = await Car.findOrFail(id)
		if (body.name) car.name = body.name
		if (body.description) car.description = body.description
		if (body.images) {
			await car.related('images').detach()
			await car.related('images').attach(body.images)
		}
		await car.save()
		return car
	}

	public async deleteAll() {
		return (await Car.all()).map((car) => car.delete())
	}

}
