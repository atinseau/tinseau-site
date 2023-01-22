import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected eventTableName = 'events'
	protected trackAccessTableName = 'track_accesses'

	public async up() {

		this.schema.createTable(this.eventTableName, (table) => {
			table.uuid('id').primary()

			table.string('title').notNullable()
			table.date('date').notNullable().unique()
			table.text('description').notNullable()
			table.json('options').defaultTo([])


			table
				.uuid('circuit_id')
				.references('circuits.id')
				.onDelete('CASCADE')
	
			// accés piste | clasic
			// locations

		})

		this.schema.createTable(this.trackAccessTableName, (table) => {
			table.uuid('id').primary()
			table.integer('places').notNullable()
			table.integer('price').notNullable()
			table.json('options').defaultTo([])

			table
				.uuid('event_id')
				.references('events.id')
				.onDelete('CASCADE')
		})
	}

	public async down() {
		this.schema.dropTable(this.eventTableName)
		this.schema.dropTable(this.trackAccessTableName)
	}
}
