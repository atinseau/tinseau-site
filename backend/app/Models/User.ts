import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BelongsTo, belongsTo, beforeDelete, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { BaseModelWithUuid } from 'App/Functions/ModelExtension'
import File from './File'
import Decharge from './Decharge'
import UserCar from './UserCar'

export default class User extends BaseModelWithUuid {
	@column()
	public email: string

	@column()
	public username?: string

	@column({ serializeAs: null })
	public password?: string
	@column({ serializeAs: null })
	public rememberMeToken?: string
	
	@column()
	public profil_id: string

	@belongsTo(() => File, { foreignKey: "profil_id" })
	public profil: BelongsTo<typeof File>

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@hasMany(() => UserCar, { foreignKey: "user_id" })
	public cars: HasMany<typeof UserCar>

	@hasMany(() => Decharge, { foreignKey: "user_id" })
	public decharges: HasMany<typeof Decharge>

	@beforeSave()
	public static async hashPassword(User: User) {
		if (User.$dirty.password) {
			User.password = await Hash.make(User.password as string)
		}
	}

	@beforeDelete()
	public static async deleteProfil(user: User) {
		const profil = await File.find(user.profil_id)
		if (profil) await profil.delete()
	}

	public async verifyPassword(password: string) {
		if (!this.password) return false
		return await Hash.verify(this.password as string, password)
	}
}
