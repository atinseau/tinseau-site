import { DateTime } from 'luxon'
import { beforeDelete, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { BaseModelWithUuid } from 'App/Functions/ModelExtension'
import User from './User'
import File from './File'

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

	@manyToMany(() => File, {
		pivotForeignKey: "related_id",
		pivotRelatedForeignKey: "file_id",
		pivotTable: "morph_files"
	})
	public images: ManyToMany<typeof File>

	@beforeDelete()
	public static async deleteImages(car: UserCar) {
		const images = await car.related('images').query()
		for (const image of images)
			await image.delete()
	}

}
