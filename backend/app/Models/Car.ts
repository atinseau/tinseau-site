import { beforeDelete, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { BaseModelWithUuid } from 'App/Functions/ModelExtension'

import Image from './Image'
import Location from './Location'

export default class Car extends BaseModelWithUuid {

	@column()
	public name: string

	@column()
	public description: string

	@hasMany(() => Location, { foreignKey: "car_id" })
	public locations: HasMany<typeof Location>

	@manyToMany(() => Image, {
		pivotForeignKey: "related_id",
		pivotRelatedForeignKey: "image_id",
		pivotTable: "morph_images"
	})
	public images: ManyToMany<typeof Image>

	@beforeDelete()
	public static async detachImages(car: Car) {
		await car.related('images').detach()
	}
}
