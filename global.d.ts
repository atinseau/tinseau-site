type OrderType = "location" | "ttd"

interface SortMode {
	label: string
	value: string
}

type GraphqlType<T> = {
	attributes: T
	id?: string
	__typename?: string
}

type GraphqlData <T> = {
	data: T
	__typename?: string
}


type TTDEvent = GraphqlType<{
	title: string
	date: string
	places: number
	classic: {
		price: number
	}
}>

type Circuit = GraphqlType<{
	title: string
	description: string
	events: GraphqlData<TTDEvent[]>
}>

