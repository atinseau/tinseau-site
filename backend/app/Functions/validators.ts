import { schema, rules } from '@ioc:Adonis/Core/Validator'

const optionValidation = schema.object().members({
	name: schema.string(),
	price: schema.number(),
	settings: schema.object().members({
		type: schema.enum(["bool", "number"]),
		value: schema.string()
	})
})

const locationValidation = schema.object().members({
	instances_amount: schema.number(),
	exclusive_price: schema.number(),
	instance_price: schema.number(),
	serie_format: schema.enum(["s3 t4", "s6 t7", "s4 t2"]),
	car_id: schema.string([rules.uuid()]),
	options: schema.array.optional().members(optionValidation)
})


export {
	optionValidation,
	locationValidation
} 