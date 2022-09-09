import { useQuery } from "@apollo/client"
import { GET_CIRCUITS_WITH_EVENTS } from "src/graphql/query/circuits"
import { useEffect, useState } from "react"
import OrderContext from "./OrderContext"
import useErrorContext from "src/hooks/useErrorContext"

interface Props {
	children: React.ReactNode
}

const OrderProvider: React.FC<Props> = ({ children }) => {

	const errorCtx = useErrorContext()

	const [items, setItems] = useState<OrderItem[]>([])
	const [currentItemId, setCurrentItemId] = useState<number>(-1)

	const [orderType, setOrderType] = useState<OrderType | null>(null)

	const [circuits, setCircuits] = useState<GraphqlData<Circuit[]>>({
		data: []
	})

	const { data, loading } = useQuery(GET_CIRCUITS_WITH_EVENTS)

	useEffect(() => {
		if (loading && !data)
			return
		setCircuits(data.circuits)
	}, [loading])


	const createItem = (circuit: Circuit, event: TTDEvent) => {

		const { attributes: { events, ...circuitWithoutEvents }, ...rest } = circuit

		if (items.find((item) => item.event.id === event.id)) {
			errorCtx.createError({
				title: "Déjà choisi",
				message: "Vous avez déjà choisi cette événement",
				type: "danger"
			})
			return false
		}

		setItems([...items, {
			circuit: {
				attributes: circuitWithoutEvents,
				...rest
			},
			event: event,
			order: {
				type: orderType as OrderType
			}
		}])

		setCurrentItemId(items.length - 1)
		errorCtx.createError({
			title: "Événement choisi",
			message: "Vous avez choisi \"" + event.attributes.title + "\"",
			type: "success"
		})
		return true
	}

	return <OrderContext.Provider value={{
		orderType,
		items,
		circuits,
		setOrderType,
		createItem
	}}>
		{children}
	</OrderContext.Provider>
}

export default OrderProvider;