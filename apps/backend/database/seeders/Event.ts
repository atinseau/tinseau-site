import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Event from 'App/Models/Event'

export default class extends BaseSeeder {
	public async run() {
		await Event.createMany([
			{
				date: new Date(),
				title: faker.address.city(),
				description: faker.lorem.paragraph()
			}
		]) 
	}
}
