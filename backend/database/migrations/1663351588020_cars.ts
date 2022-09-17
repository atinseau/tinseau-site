import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'cars'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.uuid('id').primary()

			table.string('name').notNullable().unique()
			table.text('description').notNullable()

			// images
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
