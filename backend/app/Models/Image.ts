import { beforeDelete, column } from '@ioc:Adonis/Lucid/Orm'
import BaseModelWithUuid from 'App/Functions/BaseModelWithUuid'
import Drive from "@ioc:Adonis/Core/Drive"

export default class Image extends BaseModelWithUuid {

	@column()
	public title: string

	@column()
	public description: string

	@column()
	public url: string

	@column()
	public identifier: string

	@beforeDelete()
	public static async deleteFile (image: Image) {
		await Drive.delete(image.identifier)
	}

}
