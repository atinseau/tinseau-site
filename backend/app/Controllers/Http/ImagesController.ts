import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Image from 'App/Models/Image'

import { schema } from "@ioc:Adonis/Core/Validator"

export default class ImagesController {

	public async index(ctx: HttpContextContract) {
		return await Image.all()
	}

	public async create(ctx: HttpContextContract) {

		const newImageCreateSchema = schema.create({
			title: schema.string(),
			description: schema.string(),
			image: schema.file({
				extnames: ["jpg", "jpeg", "png", "gif"],
				size: "2mb",
			})
		})

		const body = await ctx.request.validate({ schema: newImageCreateSchema })
		const image = new Image()

		await body.image.moveToDisk("uploads", { visibility: "public" }, "s3")

		image.title = body.title
		image.description = body.description
		image.url = body.image.filePath as string
		image.identifier = body.image.fileName as string

		await image.save()
		return image
	}

	public async deleteAll() {
		return (await Image.all()).map((image) => image.delete())
	}
}
