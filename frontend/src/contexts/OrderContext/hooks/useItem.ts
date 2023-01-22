import { useEffect, useMemo, useState } from "react"
import { useErrorContext } from "src/hooks"


const useItem = (

	currentItemId: number,
	items: OrderItem[],
	orderType: OrderType | null,
	setItems: ReactDispatch<OrderItem[]>,
	setCurrentItemId: ReactDispatch<number>,
	setCurrentLocationId: ReactDispatch<number>,
	setOrderType: ReactDispatch<OrderType | null>,
) => {

	const errorCtx = useErrorContext()

	const [bufferedItem, setBufferedItem] = useState<OrderItem | null>(null)

	const item = useMemo(() => bufferedItem || items.at(currentItemId) || null, [items, currentItemId, bufferedItem])

	const createItem = (circuit: TTDCircuit, event: TTDEvent) => {
		const { events, ...circuitWithoutEvents } = circuit
		if (items.find((item) => item.event.id === event.id)) {
			errorCtx.createError({
				title: "Déjà choisi",
				message: "Vous avez déjà choisi cette événement",
				type: "danger"
			})
			return false
		}
		const newItemList: OrderItem[] = [...items, {
			circuit: circuitWithoutEvents,
			event: event,
			order: {
				type: orderType as OrderType,
				options: [],
				...(orderType === "location" ? {
					locations: []
				} : {
					track_access: {
						count: 1,
						options: []
					}
				})
			}
		}]
		setItems(newItemList)
		setCurrentItemId(newItemList.length - 1)

		errorCtx.createError({
			title: "Événement choisi",
			message: "Vous avez choisi \"" + event.title + "\"",
			type: "success"
		})
		return true
	}

	const updateItem = (nextItem: OrderItem) => {
		if (!item)
			return
		items[currentItemId] = nextItem
		setItems(structuredClone(items))
	}

	const nextItem = () => {
		const nextId = currentItemId + 1 < items.length ? currentItemId + 1 : 0
		if (items[nextId].order.type === "location")
			setCurrentLocationId(0)
		setOrderType(items[nextId].order.type)
		setCurrentItemId(nextId)
	}

	useEffect(() => {
		if (item && orderType !== item.order.type)
			setCurrentItemId(items.findIndex((item) => item.order.type === orderType))
	}, [orderType])

	return {
		createItem,
		updateItem,
		nextItem,
		setBufferedItem,
		item
	}
}


export default useItem;