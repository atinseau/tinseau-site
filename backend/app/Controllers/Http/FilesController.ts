import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import File from 'App/Models/File'

import { schema } from "@ioc:Adonis/Core/Validator"

export default class FilesController {

	public async index() {
		return await File.all()
	}

	public async create(ctx: HttpContextContract) {

		const newImageCreateSchema = schema.create({
			title: schema.string(),
			description: schema.string(),
			file: schema.file({
				size: "2mb",
			})
		})

		const body = await ctx.request.validate({ schema: newImageCreateSchema })
		const file = new File()

		await body.file.moveToDisk("./", {
			visibility: "public",
			name: body.file.clientName
		}, "s3")

		file.title = body.title
		file.description = body.description
		file.url = body.file.filePath as string

		file.metadata = {
			identifier: body.file.fileName,
			drive: "s3",
			type: "image"
		}

		await file.save()
		return file
	}

	public async deleteAll() {
		return (await File.all())
			.map((file) => file.delete())
	}
}
