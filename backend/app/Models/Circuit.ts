import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import BaseModelWithUuid from 'App/Functions/BaseModelWithUuid'
import Event from './Event'

export default class Circuit extends BaseModelWithUuid {

	@hasMany(() => Event, {
		foreignKey: "circuit_id"
	})
	public events: HasMany<typeof Event>

	@column()
	public name: string

	@column()
	public description: string
}
