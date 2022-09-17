type OrderType =
	"location" |
	"ttd"

type OrderOptionType =
	"classic" |
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



