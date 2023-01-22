import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Circuit from 'App/Models/Circuit'

import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
	public async run() {
		await Circuit.createMany([...Array.from({ length: 4 })].map(() => ({
			name: faker.name.firstName(),
			description: faker.lorem.paragraph()
		})))
	}
}