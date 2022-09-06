import { useQuery } from "@apollo/client"
import { GET_CIRCUITS_WITH_EVENTS } from "graphql/query/circuits"
import { useEffect, useState } from "react"
import OrderContext from "./OrderContext"

interface Props {
	children: React.ReactNode
}

const OrderProvider: React.FC<Props> = ({ children }) => {

	const [items, setItems] = useState([])
	const [orderType, setOrderType] = useState<OrderType | null>("location")
	
	const [circuits, setCircuits] = useState<GraphqlData<Circuit[]>>({
		data: []
	})

	const { data, loading } = useQuery(GET_CIRCUITS_WITH_EVENTS)
	
	useEffect(() => {
		if (loading && !data)
			return
		setCircuits(data.circuits)
	}, [loading])

	return <OrderContext.Provider value={{
		orderType,
		circuits,
		setOrderType,
	}}>
		{children}
	</OrderContext.Provider>
}

export default OrderProvider;