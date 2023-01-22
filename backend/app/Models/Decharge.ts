import { DateTime } from 'luxon'
import { beforeDelete, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { BaseModelWithUuid } from 'App/Functions/ModelExtension'
import { jsonColumn } from 'App/Functions/jsonColumn'

import File from './File'
import User from './User'

export default class Decharge extends BaseModelWithUuid {
	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@column()
	public user_id: string

	@belongsTo(() => User, { foreignKey: "user_id" })
	public user: BelongsTo<typeof User>

	@jsonColumn()
	public data: { [key: string]: any }

	@column()
	public type: DechargeType

	@column()
	public expiration: Date

	@column()
	public file_id: string

	@belongsTo(() => File, { foreignKey: "file_id" })
	public file: BelongsTo<typeof File>

	@beforeDelete()
	public static async deleteFile(decharge: Decharge) {
		if (!decharge.file_id)
			return
		const file = await decharge.related('file').query().first()
		if (file)
			await file.delete()
	}

}
