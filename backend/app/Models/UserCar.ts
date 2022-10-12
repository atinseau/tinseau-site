import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { BaseModelWithUuid } from 'App/Functions/ModelExtension'
import User from './User'

export default class UserCar extends BaseModelWithUuid {
	
	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@column()
	public brand: string

	@column()
	public model: string

	@column()
	public registration: string

	@column()
	public assurance_name: string

	@column()
	public assurance_number: string

	@column()
	public user_id: string

	@belongsTo(() => User)
	public user: BelongsTo<typeof User>

}
