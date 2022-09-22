import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'images'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.uuid('id').primary()
			table.string('title').notNullable()
			table.string('description').notNullable()

			table.string('url').notNullable().unique()
			table.string('identifier').notNullable().unique()
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
