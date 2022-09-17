import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import BaseModelWithUuid from 'App/Functions/BaseModelWithUuid'
import Location from './Location'

export default class Car extends BaseModelWithUuid {
	@column({ isPrimary: true })
	public id: string

	@column()
	public name: string

	@column()
	public description: string

	@hasMany(() => Location, { foreignKey: "car_id" })
	public locations: HasMany<typeof Location>
}
