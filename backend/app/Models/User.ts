import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BelongsTo, belongsTo, beforeDelete } from '@ioc:Adonis/Lucid/Orm'
import { BaseModelWithUuid } from 'App/Functions/ModelExtension'
import Image from './Image'

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

	@belongsTo(() => Image, { foreignKey: "profil_id" })
	public profil: BelongsTo<typeof Image>

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@beforeSave()
	public static async hashPassword(User: User) {
		if (User.$dirty.password) {
			User.password = await Hash.make(User.password as string)
		}
	}

	@beforeDelete()
	public static async deleteProfil(user: User) {
		const profil = await Image.find(user.profil_id)
		if (profil) await profil.delete()
	}

	public async verifyPassword(password: string) {
		if (!this.password) return false
		return await Hash.verify(this.password as string, password)
	}
}
