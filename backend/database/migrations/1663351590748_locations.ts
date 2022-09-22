import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'locations'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.uuid('id').primary()

			table.integer('instances_amount').notNullable()
			table.integer('max_instances').notNullable()
			table.float('exclusive_price').notNullable()
			table.float('instance_price').notNullable()
			table.string("serie_format").notNullable()
			table.json("options").defaultTo([])

			table
				.uuid('event_id')
				.references('events.id')
				.onDelete('CASCADE')

			table
				.uuid('car_id')
				.references('cars.id')
				.onDelete('CASCADE')

			// car relation
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
