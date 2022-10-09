import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'files'
	protected morphTableName = 'morph_files'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.uuid('id').primary()
			table.string('title').notNullable()
			table.string('description').notNullable()
			table.string('url').notNullable().unique()
			table.json('metadata').notNullable()
		})

		this.schema.createTable(this.morphTableName, (table) => {
			table.increments('id').primary()
		
			table
				.uuid('file_id')
				.references('files.id')
				.onDelete('CASCADE')

			// reference to any model
			table
				.uuid('related_id')
			
			table.unique(['file_id', 'related_id'])
		})
	}

	public async down() {
		this.schema.dropTable(this.morphTableName)
		this.schema.dropTable(this.tableName)
	}
}
