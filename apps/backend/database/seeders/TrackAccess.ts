import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TrackAccess from 'App/Models/TrackAccess'

export default class extends BaseSeeder {
	public async run() {
		await TrackAccess.createMany([
			{
				places: 65,
				price: 550,
				options: [
					{
						name: "Accompagnateur",
						price: 100,
						settings: {
							type: "number",
							value: 0
						}
					}
				]
			}
		])
	}
}
