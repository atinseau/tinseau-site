import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import File from 'App/Models/File'


import { schema } from "@ioc:Adonis/Core/Validator"

import Drive from '@ioc:Adonis/Core/Drive'

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

		file.title = body.title
		file.description = body.description

		file.metadata = {
			identifier: body.file.fileName,
			drive: 'local',
			type: "image"
		}

		await body.file.moveToDisk('./')

		if (!body.file.fileName) {
			throw new Error("File not found")
		}
		file.url = await Drive.getUrl(body.file.fileName)
		await file.save()
		return file
	}

	public async deleteAll(ctx: HttpContextContract) {
		try {
			return (await File.all())
				.map((file) => file.delete())
		} catch (e) {
			console.log(e)
			ctx.response.status(500)
			return {
				error: "Error deleting files"
			}
		}
	}

	public async delete(ctx: HttpContextContract) {
		try {
			const { id } = ctx.params

			const file = await File.findOrFail(id)

			await file.delete()

			return {
				message: "File deleted"
			}
		} catch (e) {
			console.log(e)
			ctx.response.status(404)
			return {
				error: "File not found"
			}
		}

	}
}
