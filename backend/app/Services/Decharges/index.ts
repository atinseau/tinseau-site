import { generate } from "./bases"
import { schema, validator } from "@ioc:Adonis/Core/Validator"



export default class DechargesGenerator {

	static readonly types = ["track_access", "location", "additional_driver"]

	private static getSchema(type: DechargeType) {
		const mainSchema = {
			address: schema.string(),
			city: schema.string(),
			email: schema.string(),
			fullname: schema.string(),
			jobs: schema.string(),
			license: schema.string(),
			postal: schema.string(),
			tel: schema.string()
		}

		if (type === "location") {
			mainSchema["location"] = schema.string()
		}

		return mainSchema
	}

	static async validate(body: any) {
		const data = await DechargesGenerator.prepareData(body)
		return {
			...data,
			...await validator.validate({
				schema: schema.create({
					data: schema.object().members(DechargesGenerator.getSchema(data.type))
				}),
				data: body,
				cacheKey: data.type
			})
		}
	}

	private static async prepareData(data: any) {
		const output = await validator.validate({
			schema: schema.create({
				type: schema.enum(DechargesGenerator.types),
				signature: schema.string()
			}),
			data: data
		})
		return output as { type: DechargeType, signature: string }
	}

	static async createDecharge(builder: DechargeBuilder) {
		return await generate(builder)
	}
}