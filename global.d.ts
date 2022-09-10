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

type GraphqlData<T> = {
	data: T
	__typename?: string
}

type UnwrapGraphql<T> = T extends GraphqlType<infer U> ? U : T

type Image = GraphqlType<{
	url: string
	alternativeText: string
	width: number
	height: number
}>

type Car = GraphqlType<{
	name: string
	images: GraphqlData<Image[]>
}>

type TTDLocation = {
	car: GraphqlData<Car>
	available_series: number
	exclusive_price: number
	serie_format: string
	serie_price: number
}

type TTDEvent = GraphqlType<{
	title: string
	date: string
	places: number
	classic: {
		price: number
	}
	locations: TTDLocation[]
}>

type Circuit = GraphqlType<{
	title: string
	description: string
	events: GraphqlData<TTDEvent[]>
	logo: GraphqlData<Image>
}>

type CircuitWithoutEvents = GraphqlType<Omit<UnwrapGraphql<Circuit>, 'events'>>

type OrderItem = {
	circuit: CircuitWithoutEvents
	event: TTDEvent
	order: {
		type: OrderType
		location?: any
	}
}

// type UnwrapCircuit = UnwrapGraphql<Circuit>
