import { useState } from "react"
import OrderContext from "./OrderContext"

interface Props {
	children: React.ReactNode
}

const OrderProvider: React.FC<Props> = ({ children }) => {

	const [orderType, setOrderType] = useState<OrderType | null>(null)
	
	return <OrderContext.Provider value={{
		orderType,
		setOrderType
	}}>
		{children}
	</OrderContext.Provider>
}

export default OrderProvider;