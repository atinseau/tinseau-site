 import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import DechargesGenerator from 'App/Services/Decharges'

export default class extends BaseSchema {
	protected tableName = 'decharges'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.uuid('id').primary()

			table.enum('type', DechargesGenerator.types).notNullable()
			table.json('data').notNullable()

			table
				.uuid('file_id')
				.references('files.id')
				.onDelete("SET NULL")

			table
				.uuid('user_id')
				.references('users.id')
				.onDelete('CASCADE')

			/**
			 * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
			 */
			table.timestamp('created_at', { useTz: true })
			table.timestamp('updated_at', { useTz: true })
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
