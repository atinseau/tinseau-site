import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from "@ioc:Adonis/Core/Validator"
import UserCar from 'App/Models/UserCar'

export default class UserCarsController {

	public async myCars(ctx: HttpContextContract) {
		const cars = await ctx.auth.user!
			.related('cars')
			.query()
		return cars
	}

	public async create(ctx: HttpContextContract) {
		const CreateUserCarSchema = schema.create({
			brand: schema.string(),
			model: schema.string(),
			registration: schema.string(),
			assurance_name: schema.string(),
			assurance_number: schema.string()
		})
		const body = await ctx.request.validate({ schema: CreateUserCarSchema })
		try {
			const car = await ctx.auth.user!.related('cars').create(body)
			return car
		} catch (e) {
			ctx.response.badRequest({
				error: "Une voiture avec cette immatriculation existe déjà"
			})
		}
	}

	public async deleteOne(ctx: HttpContextContract) {
		try {
			const car = await UserCar.findOrFail(ctx.params.id)
			await car.delete()
			return {
				message: "Voiture supprimée"
			}
		} catch (e) {
			return ctx.response.notFound({
				error: "Voiture introuvable"
			})
		}
	}


	// DEBUG
	public async all() {
		return await UserCar.all()
	}

	public async deleteAll() {
		return (await UserCar.all())
			.map((car) => car.delete())
	}
}