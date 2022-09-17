import { column, ColumnOptions } from "@ioc:Adonis/Lucid/Orm"

const jsonColumn = (options?: Partial<ColumnOptions>) => {
	return column({
		...options,
		serialize: (value) => typeof value === "string" ? JSON.parse(value) : value,
		prepare: (value) => JSON.stringify(value)
	})
}

export {
	jsonColumn
}