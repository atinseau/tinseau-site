import { beforeCreate, beforeDelete, column } from '@ioc:Adonis/Lucid/Orm'
import { BaseModelWithUuid } from 'App/Functions/ModelExtension'
import Drive from "@ioc:Adonis/Core/Drive"
import { jsonColumn } from 'App/Functions/jsonColumn'

interface FileMeta {
	identifier?: string
	bucket?: "tinseau-image" | "tinseau-decharge"
	drive: "s3" | "local" | "external"
	type: "image" | "pdf" | "video" | "audio"
}

export default class File extends BaseModelWithUuid {


	@column()
	public title: string

	@column()
	public description: string

	@column()
	public url: string

	@jsonColumn()
	public metadata: FileMeta


	@beforeCreate()
	public static async beforeCreate(file: File) {
		if (file.metadata.drive === "s3") {
			if (!file.metadata.bucket)
				file.metadata.bucket = "tinseau-image"
			if (!file.metadata.identifier)
				throw new Error("Missing identifier for s3 file: " + file.title)
		}

	}

	@beforeDelete()
	public static async deleteFile(file: File) {
		if (
			file.metadata.drive === "s3" &&
			file.metadata.identifier &&
			file.metadata.bucket
		)
			await Drive.use('s3').bucket(file.metadata.bucket).delete(file.metadata.identifier)
	}
}

