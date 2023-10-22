import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, validator } from "@ioc:Adonis/Core/Validator"
import UserCar from 'App/Models/UserCar'
import { getFileUrl } from '../../../utils'

export default class UserCarsController {

	public async myCars(ctx: HttpContextContract) {
		const cars = await ctx.auth.user!
			.related('cars')
			.query()
			.preload('images')

		return cars
	}

	public async create(ctx: HttpContextContract) {

		const user = ctx.auth.user!

		const CreateUserCarSchema = schema.create({
			brand: schema.string(),
			model: schema.string(),
			registration: schema.string(),
			assurance_name: schema.string(),
			assurance_number: schema.string(),
			allow_image_sharing: schema.boolean()
		})

		const data = JSON.parse(ctx.request.body().data)
		const body = await validator.validate({ schema: CreateUserCarSchema, data: data })

		let car: UserCar | undefined

		try {
			car = await user.related('cars').create(body)
			for (const file of ctx.request.files('images')) {
				await file.moveToDisk('./user_cars')

				if (!file.fileName) {
					throw new Error("File not found")
				}

				// @ts-ignore


				await car.related('images').create({
					title: file.clientName,
					description: "Image d'une voiture de l'utilisateur: " + user.username,
					url: getFileUrl('/user_cars/' + file.fileName),
					metadata: {
						identifier: file.fileName,
						drive: "local",
						type: "image"
					}
				})
			}
			return car
		} catch (e) {
			console.log(e)
			if (car)
				await car.delete()
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
		return await UserCar.query().preload('images')
	}

	public async deleteAll() {
		return (await UserCar.all())
			.map((car) => car.delete())
	}
}