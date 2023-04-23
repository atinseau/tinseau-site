import { beforeDelete, column } from '@ioc:Adonis/Lucid/Orm'
import { BaseModelWithUuid } from 'App/Functions/ModelExtension'

import { jsonColumn } from 'App/Functions/jsonColumn'

import Drive from '@ioc:Adonis/Core/Drive'

export default class File extends BaseModelWithUuid {


	@column()
	public title: string

	@column()
	public description: string

	@column()
	public url: string

	@jsonColumn()
	public metadata: FileMeta

	@beforeDelete()
	public static async deleteFile(file: File) {
		const fileName = file.url.replace('/images/', '')
		try {
			await Drive.delete(fileName)
		} catch (e) {
			console.error('Error deleting file', e)
		}
	}
}

