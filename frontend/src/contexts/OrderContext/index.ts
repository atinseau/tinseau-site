
import React from "react"

export interface IOrderContext {
	orderType: OrderType | null
	items: OrderItem[]
	currentItemId: number
	currentLocationId: number
	removeItemId: number[]
	item: OrderItem | null
	location: TTDLocation | null
	circuits: TTDCircuit[]
	stockSession: StockSession | undefined
	openDechargeDialog: boolean

	setBufferedItem: (item: OrderItem | null) => void
	setCurrentLocationId: (id: number) => void
	setOrderType: (orderType: OrderType) => void
	createItem: (circuit: TTDCircuit, event: TTDEvent) => boolean
	addLocation: (location: TTDLocationItem) => boolean
	addOption: (option: Omit<OrderOption, "value"> & { initalValue: any }, type: OrderOptionType) => void
	updateOption: (option: OrderOption, type: OrderOptionType, value: any) => void
	nextItem: () => void
	updateRemoveItemId: (idx: number, action: "add" | "remove") => void
	clearRemoveItem: (shouldBuffered: boolean) => void
	setCurrentItemId: (id: number) => void
	setCircuits: (circuits: TTDCircuit[]) => void

	updateItem: (item: OrderItem) => void

	getTotal: () => number

	// STOCK SESSION

	startStockSession: (onStart: () => void) => void
	setOpenDechargeDialog: (open: boolean) => void
	deleteStockSession: () => void

}


const getLocationByCarId = (carId: string, locations: TTDLocation[]) => {
	for (const location of locations)
		if (carId == location.car.id)
			return location
	return null
}

export {
	getLocationByCarId
}

const OrderContext = React.createContext<IOrderContext>({} as IOrderContext)

export default OrderContext;
