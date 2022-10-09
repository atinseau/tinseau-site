import { beforeDelete, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { BaseModelWithUuid } from 'App/Functions/ModelExtension'

import File from './File'
import Location from './Location'

export default class Car extends BaseModelWithUuid {

	@column()
	public name: string

	@column()
	public description: string

	@hasMany(() => Location, { foreignKey: "car_id" })
	public locations: HasMany<typeof Location>

	@manyToMany(() => File, {
		pivotForeignKey: "related_id",
		pivotRelatedForeignKey: "file_id",
		pivotTable: "morph_files"
	})
	public images: ManyToMany<typeof File>

	@beforeDelete()
	public static async detachImages(car: Car) {
		await car.related('images').detach()
	}
}
