import { beforeDelete, column } from '@ioc:Adonis/Lucid/Orm'
import { BaseModelWithUuid } from 'App/Functions/ModelExtension'
import Drive from "@ioc:Adonis/Core/Drive"

export default class Image extends BaseModelWithUuid {

	@column()
	public title: string

	@column()
	public description: string

	@column()
	public url: string

	@column()
	public type: "s3" | "local" | "external"

	@column()
	public identifier?: string

	@beforeDelete()
	public static async deleteFile(image: Image) {
		if (image.type === "s3" && image.identifier)
			await Drive.delete(image.identifier)
	}
}

