type With<T, U> = T & U

type OrderType =
	"location" |
	"ttd"

type OrderOptionType =
	"track_access" |
	"location" |
	"global"
	
type TTDOptionType =
	"bool" |
	"number"

type SerieFormat =
	"s3 t4" |
	"s6 t7" |
	"s4 t2"



type TTDOption = {
	name: string
	price: number
	settings: {
		type: TTDOptionType
		value: any
	}
}

type TTDTrackAccess = {
	id: string
	places: number
	price: number
	options: TTDOption[]
	event_id: string
}

type TTDCar = {
	id: string
	name: string
	description: string
}

type TTDLocation = {
	id: string
	instances_amount: number
	max_instances: number
	exclusive_price: number
	instance_price: number
	serie_format: SerieFormat
	options: TTDOption[]
	event_id: string
	car_id: string

	car: TTDCar
}

type TTDLocationItem = {
	car_id: string
	instance_amount: number
}

type TTDEvent = {
	id: string
	title: string
	date: Date
	description: string
	options: TTDOption[]
	circuit_id: string
	track_access: TTDTrackAccess
	locations: TTDLocation[]
}

type TTDCircuit = {
	id: string
	name: string
	description: string
	events: TTDEvent[]
	options: TTDOption[]
}



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


type OrderOption = {
	name: string
	value: any
	type: TTDOptionType
}

type WithOrderOptions<T> = With<T, { options: OrderOption[] }>

type ClassicOrderItem = { count: number }

type OrderSubItem = {
	type: OrderType
	locations?: WithOrderOptions<TTDLocationItem>[]
	track_access?: WithOrderOptions<ClassicOrderItem>
	options: OrderOption[]
}

type OrderItem = {
	circuit: Omit<TTDCircuit, 'events'>
	event: TTDEvent
	order: OrderSubItem
}


