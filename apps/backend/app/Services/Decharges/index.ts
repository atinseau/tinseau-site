import { generate } from "./bases"
import { schema, validator, rules } from "@ioc:Adonis/Core/Validator"
import UserCar from "App/Models/UserCar"



export default class DechargesGenerator {

	static readonly types: DechargeType[] = ["track_access", "location"]

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

		if (type === "track_access") {
			mainSchema["car_id"] = schema.string([rules.uuid({ version: 4 })])
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
		if (builder.skeleton === false && builder.type === "track_access") {
			const userCar = await UserCar.find(builder.data.car_id)
			if (!userCar)
				throw new Error("La voiture n'existe pas")
			builder = {
				...builder,
				data: {
					...builder.data,
					car: userCar
				}
			}
		}
		return await generate(builder)
	}
}