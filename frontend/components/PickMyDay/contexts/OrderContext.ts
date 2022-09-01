
import React from "react"

interface IOrderContext {
	items: OrderItem[]
	insertItem: (circuit: Circuit, event: TTDEvent) => boolean
	getTotal: () => number
	getCurrentItem: () => OrderItem | null
	setCurrentItem: (item: OrderItem) => void
}

const OrderContext = React.createContext<IOrderContext>({} as IOrderContext)



export default OrderContext;