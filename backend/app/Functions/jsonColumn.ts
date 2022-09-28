import { column, ColumnOptions } from "@ioc:Adonis/Lucid/Orm"

type JsonColumnOptions = Partial<Omit<ColumnOptions, 'serialize' | 'prepare'>>

const jsonColumn = (options?: JsonColumnOptions) => {
	return column({
		...options,
		consume: (value, attribute, model) => {
			try {
				const parsed = typeof value === "string" ? JSON.parse(value) : value
				return options?.consume ? options.consume(parsed, attribute, model) : parsed
			} catch (e) {
				return null
			}
		},
		serialize: (value) => typeof value === "string" ? JSON.parse(value) : value,
		prepare: (value) => JSON.stringify(value)
	})
}

export {
	jsonColumn
}