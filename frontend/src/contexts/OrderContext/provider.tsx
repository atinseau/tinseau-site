import { useState } from "react"
import { useCircuits } from "src/hooks"
import OrderContext from "."
import StockSession from "./components/StockSession"
import {
	useItem,
	useLocation,
	useOption,
	useRemoveItem,
	useStockSession,
	useTotal
} from "./hooks"

interface Props {
	children: React.ReactNode
}

const OrderProvider: React.FC<Props> = ({ children }) => {

	const [circuits, setCircuits] = useCircuits()

	const [items, setItems] = useState<OrderItem[]>([])
	const [currentItemId, setCurrentItemId] = useState<number>(-1)
	const [currentLocationId, setCurrentLocationId] = useState<number>(-1)
	const [orderType, setOrderType] = useState<OrderType | null>(null)

	const {
		createItem,
		updateItem,
		nextItem,
		setBufferedItem,
		item
	} = useItem(currentItemId, items, orderType ,setItems, setCurrentItemId, setCurrentLocationId, setOrderType)

	const {
		clearRemoveItem,
		removeItemId,
		updateRemoveItemId
	} = useRemoveItem(currentItemId, item, items, setBufferedItem, setCurrentItemId, setItems)

	const { addOption, updateOption } = useOption(item, items, currentLocationId, setItems)

	const { getTotal } = useTotal(items)

	const { location, addLocation } = useLocation(item, items, currentLocationId, setCurrentLocationId, setItems)

	const {
		startStockSession,
		setOpenDechargeDialog,
		deleteStockSession,
		openDechargeDialog,
		stockSession
	} = useStockSession(items, setItems, setCurrentItemId, setOrderType)

	return <OrderContext.Provider value={{
		orderType,
		items,
		item,
		location,
		currentItemId,
		removeItemId,
		currentLocationId,
		circuits,
		stockSession,
		openDechargeDialog,
		deleteStockSession,
		setOpenDechargeDialog,
		startStockSession,
		updateOption,
		nextItem,
		setCircuits,
		updateRemoveItemId,
		setBufferedItem,
		addOption,
		clearRemoveItem,
		addLocation,
		setOrderType,
		getTotal,
		updateItem,
		setCurrentLocationId,
		createItem,
		setCurrentItemId
	}}>
		{children}

		{stockSession && <StockSession stockSession={stockSession} />}
	</OrderContext.Provider>
}

export default OrderProvider;