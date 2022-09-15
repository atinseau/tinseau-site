
import React from "react"

export interface IOrderContext {
	orderType: OrderType | null
	items: OrderItem[]
	currentItemId: number
	currentLocationId: number
	removeItemId: number[]
	item: OrderItem | null
	location: TTDLocation | null
	circuits: GraphqlData<Circuit[]>

	setBufferedItem: (item: OrderItem | null) => void
	setCurrentLocationId: (id: number) => void
	setOrderType: (orderType: OrderType) => void
	createItem: (circuit: Circuit, event: TTDEvent) => boolean
	addLocation: (location: LocationItem) => boolean
	addOption: (option: Omit<OrderOption, "value"> & { initalValue: any }, type: OrderOptionType) => void
	updateOption: (option: OrderOption, type: OrderOptionType, value: any) => void
	nextItem: () => void
	updateRemoveItemId: (idx: number, action: "add" | "remove") => void
	clearRemoveItem: (shouldBuffered: boolean) => void
	setCurrentItemId: (id: number) => void
	setCircuits: (circuits: GraphqlData<Circuit[]>) => void

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
