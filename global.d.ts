type OrderType = "location" | "ttd"

type LoginData = {
	email: string
	password: string
	username?: string
}


type User = {
	id: string
	email: string
	username: string
}



















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

type With<T, U> = T & U

type UnwrapGraphql<T> = T extends GraphqlType<infer U> ? U : T

type Image = GraphqlType<{
	url: string
	alternativeText: string
	width: number
	height: number
}>

type Car = GraphqlType<{
	name: string
	description: string
	images: GraphqlData<Image[]>
}>

type TTDLocation = {
	car: GraphqlData<Car>
	available_series: number
	exclusive_price: number
	exclusive_series_count: number
	serie_format: string
	serie_price: number
	options: TTDOption[]
}

type TTDOptionType = "bool" | "number"

type TTDOption = {
	name: string
	price: number
	settings: {
		type: TTDOptionType
		value: any
	}
}

type TTDEvent = GraphqlType<{
	title: string
	date: string
	places: number
	classic: {
		price: number
		options: TTDOption[]
	}
	locations: TTDLocation[]
	global_options: TTDOption[]
}>

type Circuit = GraphqlType<{
	title: string
	description: string
	events: GraphqlData<TTDEvent[]>
	logo: GraphqlData<Image>
}>

type CircuitWithoutEvents = GraphqlType<Omit<UnwrapGraphql<Circuit>, 'events'>>

type OrderOptionType = "classic" | "location" | "global"

type OrderOption = {
	name: string
	value: any
	type: TTDOptionType
}

type WithOrderOptions<T> = With<T, { options: OrderOption[] }>

type ClassicOrderItem = { count: number }

type OrderSubItem = {
	type: OrderType
	locations?: WithOrderOptions<LocationItem>[]
	classic?: WithOrderOptions<ClassicOrderItem>
	options: OrderOption[]
}

type OrderItem = {
	circuit: CircuitWithoutEvents
	event: TTDEvent
	order: OrderSubItem
}

type LocationItem = {
	car_id: string
	serie_count: number
}

// type UnwrapCircuit = UnwrapGraphql<Circuit>
