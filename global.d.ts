/// <reference types="./frontend/node_modules/next" />
/// <reference types="./frontend/node_modules/next/image-types/global" />

declare interface TTDEventOptions {
	runway_access: number,
	meal: number,
	follower: number,
	additionnal_drivers: number,
	coach: {
		used: boolean,
		dedicated: boolean
	}
}


declare interface TTDEvent {
	id: string
	title: string
	places: number
	desc: string
	date: Date
	circuit_id: string
	base: {
		price: number
		max_per_person?: number
		included_option: Omit<TTDEventOptions, 'runway_access'> & {
			[key: string]: any
		}
	},
	options_pricing: {
		[key: string]: any
		meal: number
		follower: number
		additionnal_drivers: number
		coach: {
			used: number
			dedicated: number
		}
	}
}

declare interface Circuit {
	id: string
	title: string
	events: TTDEvent[]
}

declare interface OrderItem {
	circuit: Circuit
	event: TTDEvent
	options: TTDEventOptions & {
		[key: string]: any
	}
}

type OptionChange = [
	key: string,
	value: number
]
