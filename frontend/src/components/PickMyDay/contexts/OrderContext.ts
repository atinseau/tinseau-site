
import React from "react"

interface IOrderContext {
	orderType: OrderType | null
	items: OrderItem[]
	item: OrderItem | null
	circuits: GraphqlData<Circuit[]>

	setOrderType: (orderType: OrderType) => void
	createItem: (circuit: Circuit, event: TTDEvent) => boolean
}

const OrderContext = React.createContext<IOrderContext>({} as IOrderContext)



export default OrderContext;