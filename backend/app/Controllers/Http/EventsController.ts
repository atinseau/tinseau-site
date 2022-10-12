import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { locationValidation, optionValidation } from 'App/Functions/validators';
import Car from 'App/Models/Car';
import Circuit from 'App/Models/Circuit';

import Event from "App/Models/Event";
import Location from 'App/Models/Location';
import TrackAccess from 'App/Models/TrackAccess';

export default class EventsController {

	public async index() {

		const events = await Event
			.query()
			.preload('circuit')
			.preload('track_access')
			.preload('locations')

		return events
	}

	public async create(ctx: HttpContextContract) {

		const trackAccessValidation = schema.object().members({
			places: schema.number(),
			price: schema.number(),
			options: schema.array.optional().members(optionValidation)
		})

		const newEventCreateSchema = schema.create({
			title: schema.string(),
			date: schema.date(),
			description: schema.string(),
			locations: schema.array.optional().members(locationValidation),
			circuit_id: schema.string([rules.uuid({ version: 4 })]),
			track_access: trackAccessValidation,
			options: schema.array.optional().members(optionValidation)
		})

		const body = await ctx.request.validate({ schema: newEventCreateSchema })

		try {

			const event = new Event()

			event.title = body.title
			event.date = body.date.toJSDate()
			event.description = body.description
			event.options = body.options as TTDOption[]

			const circuit = await Circuit.findBy("id", body.circuit_id)
			if (!circuit)
				throw new Error("Circuit not found")
			event.circuit_id = circuit.id

			await event.save()

			const relatedTrackAccess = await event.related('track_access').create({
				options: body.track_access.options as TTDOption[],
				places: body.track_access.places,
				price: body.track_access.price
			})

			const relatedLocations: Location[] = []
			for (const location of body.locations || []) {
				const car = await Car.findBy('id', location.car_id)
				if (!car) {
					await relatedTrackAccess.delete()
					for (const relatedLocation of relatedLocations) await relatedLocation.delete()
					await event.delete()
					throw new Error("Car not found")
				}
				relatedLocations.push(await event.related('locations').create({
					exclusive_price: location.exclusive_price,
					instance_price: location.instance_price,
					car_id: car.id,
					instances_amount: location.instances_amount,
					max_instances: location.instances_amount,
					serie_format: location.serie_format as SerieFormat,
					options: location.options as TTDOption[]
				}))
			}

			return event

		} catch (e) {
			return ctx.response.notFound({
				message: e.message
			})
		}
	}

	public async trackAccesses() {
		const tracks = await TrackAccess.all()
		return tracks
	}

	public async trackAccessDelete() {
		return await TrackAccess.query().delete()
	}


	public async update(ctx: HttpContextContract) {
		const { id } = ctx.params
		const { circuit_id } = ctx.request.body()
		const event = await Event.findOrFail(id)
		if (circuit_id) event.circuit_id = circuit_id
		await event.save()
		return event
	}

	public async deleteAll() {
		return await Event.query().delete()
	}

}
