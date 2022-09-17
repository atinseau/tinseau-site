import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Car from 'App/Models/Car'
import Location from 'App/Models/Location'

export default class extends BaseSeeder {
	public async run() {
		await Location.createMany([
			{
				exclusive_price: 5500,
				instance_price: 500,
				serie_format: 's3 t4',
				intances_amount: 4,
				max_instances: 4
			}
		])

		await Car.createMany([
			{
				description: "Audi A3 1.4 TFSI Sportback 150cv S tronic",
				name: "Audi A3"
			}
		])
	}
}
