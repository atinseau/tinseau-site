import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'images'
	protected morphTableName = 'morph_images'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.uuid('id').primary()
			table.string('title').notNullable()
			table.string('description').notNullable()
			table.enum('type', ['s3', 'local', 'external']).notNullable().defaultTo('s3')
			table.string('url').notNullable().unique()
			
			table.string('identifier')
				.nullable()
		})

		this.schema.createTable(this.morphTableName, (table) => {
			table.increments('id').primary()
		
			table
				.uuid('image_id')
				.references('images.id')
				.onDelete('CASCADE')

			// reference to any model
			table
				.uuid('related_id')
				
			

			table.unique(['image_id', 'related_id'])
		})
	}

	public async down() {
		this.schema.dropTable(this.morphTableName)
		this.schema.dropTable(this.tableName)
	}
}
