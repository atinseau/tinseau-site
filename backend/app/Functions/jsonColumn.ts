import { column, ColumnOptions } from "@ioc:Adonis/Lucid/Orm"

type JsonColumnOptions = Partial<Omit<ColumnOptions, 'serialize' | 'prepare'>>

const jsonColumn = (options?: JsonColumnOptions) => {
	return column({
		...options,
		consume: (value, attribute, model) => {
			const parsed = JSON.parse(value)
			return options?.consume ? options.consume(parsed, attribute, model): parsed
		},
		serialize: (value) => typeof value === "string" ? JSON.parse(value) : value,
		prepare: (value) => JSON.stringify(value)
	})
}

export {
	jsonColumn
}