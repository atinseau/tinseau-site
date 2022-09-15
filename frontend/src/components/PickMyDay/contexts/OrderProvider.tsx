import { useQuery } from "@apollo/client"
import { GET_CIRCUITS_WITH_EVENTS } from "src/graphql/query/circuits"
import { useEffect, useMemo, useState } from "react"
import OrderContext, { getLocationByCarId } from "./OrderContext"
import useErrorContext from "src/hooks/useErrorContext"

interface Props {
	children: React.ReactNode
}


const OrderProvider: React.FC<Props> = ({ children }) => {

	const errorCtx = useErrorContext()

	const [items, setItems] = useState<OrderItem[]>([])

	const [bufferedItem, setBufferedItem] = useState<OrderItem | null>(null)
	const [removeItemId, setRemoveItemId] = useState<number[]>([])


	const [currentItemId, setCurrentItemId] = useState<number>(-1)
	const [currentLocationId, setCurrentLocationId] = useState<number>(-1)

	const [orderType, setOrderType] = useState<OrderType | null>("ttd")

	const [circuits, setCircuits] = useState<GraphqlData<Circuit[]>>({
		data: []
	})

	const item = useMemo(() => bufferedItem || items.at(currentItemId) || null, [items, currentItemId, bufferedItem])

	const location = useMemo(() => {
		if (!item || currentLocationId == -1 || (!item.order.locations?.length)) return null
		return getLocationByCarId(item.order.locations[currentLocationId].car_id, item.event.attributes.locations)
	}, [item, currentItemId, currentLocationId])

	const { data, loading } = useQuery(GET_CIRCUITS_WITH_EVENTS)

	useEffect(() => {
		if (loading && !data)
			return
		setCircuits(data?.circuits || [])
	}, [loading])

	const nextItem = () => {
		const nextId = currentItemId + 1 < items.length ? currentItemId + 1 : 0
		if (items[nextId].order.type === "location")
			setCurrentLocationId(0)
		setCurrentItemId(nextId)
	}

	const updateRemoveItemId = (idx: number, action: "add" | "remove") => {
		if (action === "add") setRemoveItemId([...removeItemId, idx])
		else setRemoveItemId(removeItemId.filter(i => i !== idx))
	}

	const clearRemoveItem = (shouldBuffered: boolean) => {
		const newItems = []
		let itemIsFronted = false

		for (let i = 0; i < items.length; i++) {
			if (removeItemId.includes(i)) {
				if (i === currentItemId) itemIsFronted = true
				continue
			}
			newItems.push(items[i])
		}

		if (itemIsFronted && shouldBuffered) setBufferedItem(JSON.parse(JSON.stringify(item)))
		setCurrentItemId(items.length - 2)
		setRemoveItemId([])
		setItems(newItems)
	}

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
		const newItemList: OrderItem[] = [...items, {
			circuit: {
				attributes: circuitWithoutEvents,
				...rest
			},
			event: event,
			order: {
				type: orderType as OrderType,
				options: [],
				...(orderType === "location" ? {
					locations: []
				} : {
					classic: {
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
			message: "Vous avez choisi \"" + event.attributes.title + "\"",
			type: "success"
		})
		return true
	}


	const addLocation = (location: LocationItem) => {
		if (!item || (item && item.order.type !== "location"))
			return false

		if (!item.order.locations) item.order.locations = []
		if (item.order.locations.find((loc) => loc.car_id === location.car_id)) {
			errorCtx.createError({
				title: "Déjà choisi",
				message: "Vous avez déjà choisi cette voiture",
				type: "danger"
			})
			return false
		}


		item.order.locations.push({ ...location, options: [] })
		setCurrentLocationId(item.order.locations.length - 1)
		setItems(structuredClone(items))
		errorCtx.createError({
			title: "Voiture choisi",
			message: "Vous avez choisi \"" + getLocationByCarId(location.car_id, item.event.attributes.locations)?.car.data.attributes.name + "\"",
			type: "success"
		})
		return true
	}

	const addOption = (option: Omit<OrderOption, "value"> & { initalValue: any }, type: OrderOptionType) => {
		if (!item)
			return

		let itemsChanged = false

		let initalValue = null
		switch (option.type) {
			case "bool":
				initalValue = option.initalValue
				break
			default: initalValue = 0
		}

		let options: OrderOption[] = []
		if (type === "global") options = item.order.options
		else if (type === "classic") options = item.order.classic?.options || []
		else if (type === "location") options = (item.order.locations || [])[currentLocationId]?.options

		if (!options.find((o) => o.name === option.name)) {
			options.push({ ...option, value: initalValue })
			itemsChanged = true
		}

		if (itemsChanged) setItems(structuredClone(items))
	}

	const updateOption = (option: OrderOption, type: OrderOptionType, value: any) => {
		if (!item)
			return

		let itemsChanged = false

		let options: OrderOption[] = []
		if (type === "global") options = item.order.options
		else if (type === "classic") options = item.order.classic?.options || []
		else if (type === "location") options = (item.order.locations || [])[currentLocationId]?.options

		for (const o of options) {
			if (o.name === option.name) {
				o.value = value
				itemsChanged = true
				break
			}
		}

		if (itemsChanged) setItems(structuredClone(items))
	}

	const updateItem = (nextItem: OrderItem) => {
		if (!item)
			return
		items[currentItemId] = nextItem
		setItems(structuredClone(items))
	}

	const optionTotal = (dbOptions: TTDOption[], options: OrderOption[]) => {
		let total = 0

		dbOptions.forEach((option) => {
			const optionSelected = options.find((o) => o.name === option.name)
			if (!optionSelected) return

			if (option.settings.type === "number")
				total += optionSelected.value * option.price
			if (option.settings.type === "bool" && optionSelected.value)
				total += option.settings.value ? 0 : option.price
		})

		return total
	}

	const getTotal = () => {
		let total = 0

		for (const item of items) {
			if (item.order.type === "location") {
				for (const locationItem of item.order.locations || []) {
					const location = getLocationByCarId(locationItem.car_id, item.event.attributes.locations)
					if (!location) continue
					total += locationItem.serie_count === location.available_series ?
						location.exclusive_price :
						locationItem.serie_count * location.serie_price
					total += optionTotal(location.options, locationItem.options)
				}
			}
			else if (item.order.type === "ttd") {
				total += (item.order.classic?.count || 1) * item.event.attributes.classic.price
				total += optionTotal(item.event.attributes.classic.options, item.order.classic?.options || [])
			}
			total += optionTotal(item.event.attributes.global_options, item.order.options)
		}

		return total
	}

	return <OrderContext.Provider value={{
		orderType,
		items,
		item,
		location,
		currentItemId,
		removeItemId,
		currentLocationId,
		circuits,
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
	</OrderContext.Provider>
}

export default OrderProvider;