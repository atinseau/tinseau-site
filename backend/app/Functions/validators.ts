import { schema, rules } from '@ioc:Adonis/Core/Validator'
import DechargesGenerator from 'App/Services/Decharges'

const optionValidation = schema.object().members({
	name: schema.string(),
	price: schema.number(),
	dechargeable: schema.enum.optional(DechargesGenerator.types),
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
	options: schema.array.optional([rules.minLength(1)]).members(optionValidation)
})


const imageRequiredValidation = {
	image: schema.string([rules.uuid({ version: '4' })])
}

const imageOptionalValidation = {
	image: schema.string.optional([rules.uuid({ version: '4' })])
}

const imagesRequiredValidation = {
	images: schema.array([rules.minLength(1)]).members(imageRequiredValidation.image)
}

const imagesOptionalValidation = {
	images: schema.array.optional().members(imageRequiredValidation.image)
}



const createNameDescValidation = {
	name: schema.string(),
	description: schema.string()
}

const updateNameDescValidation = {
	name: schema.string.optional(),
	description: schema.string.optional()
}


export {
	optionValidation,
	locationValidation,
	createNameDescValidation,
	updateNameDescValidation,
	imagesRequiredValidation,
	imageOptionalValidation,
	imagesOptionalValidation,
	imageRequiredValidation
} 