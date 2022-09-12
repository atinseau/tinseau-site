
import React from "react"

interface IOrderContext {
	orderType: OrderType | null
	items: OrderItem[]
	item: OrderItem | null
	location: TTDLocation | null
	circuits: GraphqlData<Circuit[]>

	setOrderType: (orderType: OrderType) => void
	createItem: (circuit: Circuit, event: TTDEvent) => boolean
	addLocation: (location: LocationItem) => boolean
	addOption: (option: Omit<OrderOption, "value">, type: OrderOptionType) => void
	updateOption: (option: OrderOption, type: OrderOptionType, value: any) => void

	// setCurrentItem: (item: OrderItem) => void

	updateItem: (item: OrderItem) => void

	getTotal: () => number

}


const getLocationByCarId = (carId: string, locations: TTDLocation[]) => {
	for (const location of locations)
		if (carId == location.car.data.id)
			return location
	return null
}

export {
	getLocationByCarId
}

const OrderContext = React.createContext<IOrderContext>({} as IOrderContext)

export default OrderContext;
