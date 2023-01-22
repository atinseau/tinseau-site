import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'user_cars'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.uuid('id').primary()

			table.string('brand').notNullable()
			table.string('model').notNullable()
			
			table.string('registration').notNullable().unique()
			table.boolean('allow_image_sharing').notNullable().defaultTo(false)

			table.string('assurance_name').notNullable()
			table.string('assurance_number').notNullable()

			table
				.uuid('user_id')
				.references('users.id')
				.onDelete('CASCADE')
				.notNullable()

			table.timestamp('created_at', { useTz: true })
			table.timestamp('updated_at', { useTz: true })
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
