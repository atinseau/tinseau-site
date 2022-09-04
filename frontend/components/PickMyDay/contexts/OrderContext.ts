
import React from "react"

interface IOrderContext {
	orderType: OrderType | null
	setOrderType: (orderType: OrderType) => void
}

const OrderContext = React.createContext<IOrderContext>({} as IOrderContext)



export default OrderContext;