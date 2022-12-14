// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Location from "App/Models/Location";

export default class LocationsController {

	public async index() {
		const locations = await Location.query().preload('car')
		return locations
	}

	public async deleteAll() {
		return await Location.query().delete()
	}

	public static async getLocationByCarId(carId: string) {
		return await Location.query().where('car_id', carId).first() as Location
	}
}
