import { useMemo, useState } from "react"
import OrderContext, { getLocationByCarId } from "./OrderContext"
import useErrorContext from "src/hooks/useErrorContext"
import useCircuits from "../hooks/useCircuits"

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

	const [orderType, setOrderType] = useState<OrderType | null>("location")

	const [circuits, setCircuits] = useCircuits()

	const item = useMemo(() => bufferedItem || items.at(currentItemId) || null, [items, currentItemId, bufferedItem])

	const location = useMemo(() => {
		if (!item || currentLocationId == -1 || (!item.order.locations?.length)) return null
		return getLocationByCarId(item.order.locations[currentLocationId].car_id, item.event.locations)
	}, [item, currentLocationId])


	// useEffect(() => {
	// 	if (loading && !data)
	// 		return
	// 	setCircuits(data?.circuits || [])
	// }, [loading])

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


	const addLocation = (locationItem: TTDLocationItem) => {
		if (!item || (item && item.order.type !== "location"))
			return false

		if (!item.order.locations) item.order.locations = []
		if (item.order.locations.find((loc) => loc.car_id === locationItem.car_id)) {
			errorCtx.createError({
				title: "Déjà choisi",
				message: "Vous avez déjà choisi cette voiture",
				type: "danger"
			})
			return false
		}


		item.order.locations.push({ ...locationItem, options: [] })
		setCurrentLocationId(item.order.locations.length - 1)
		setItems(structuredClone(items))
		errorCtx.createError({
			title: "Voiture choisi",
			message: "Vous avez choisi \"" + getLocationByCarId(locationItem.car_id, item.event.locations)?.car.name + "\"",
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
				initalValue = option.initalValue === "true" ? true : false
				break
			default: initalValue = 0
		}

		let options: OrderOption[] = []
		if (type === "global") options = item.order.options
		else if (type === "track_access") options = item.order.track_access?.options || []
		else if (type === "location") options = (item.order.locations || [])[currentLocationId]?.options
		if (!options.find((o) => o.name === option.name)) {
			const newOption = { ...option, value: initalValue }
			options.push(newOption)
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
		else if (type === "track_access") options = item.order.track_access?.options || []
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
				total += option.settings.value === "true" ? 0 : option.price
		})

		return total
	}

	const getTotal = () => {
		let total = 0

		for (const item of items) {
			if (item.order.type === "location") {
				for (const locationItem of item.order.locations || []) {
					const location = getLocationByCarId(locationItem.car_id, item.event.locations)
					if (!location) continue
					total += locationItem.instance_amount === location.max_instances ?
						location.exclusive_price :
						locationItem.instance_amount * location.instance_price
					total += optionTotal(location.options, locationItem.options)
				}
			}
			else if (item.order.type === "ttd") {
				total += (item.order.track_access?.count || 1) * item.event.track_access.price
				total += optionTotal(item.event.track_access.options, item.order.track_access?.options || [])
			}
			total += optionTotal(item.event.options, item.order.options)
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