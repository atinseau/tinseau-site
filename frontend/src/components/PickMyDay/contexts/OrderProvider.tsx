import { useMemo, useState } from "react"
import OrderContext, { getLocationByCarId } from "./OrderContext"
import useErrorContext from "src/hooks/useErrorContext"
import useCircuits from "../hooks/useCircuits"

interface Props {
	children: React.ReactNode
}

// const defaultItems = [
// 	{
// 		"circuit": {
// 			"id": "4d344d75-9e59-483b-8923-ddbacb82ce93",
// 			"name": "Le mans bugatti",
// 			"description": "lsdlkqs dlkq sldkq lskd qlksd",
// 			"logo": {
// 				"id": "53c48738-4429-422c-83ac-48bd20f65943",
// 				"title": "Logo circuit",
// 				"description": "Le mans buggatti",
// 				"type": "s3",
// 				"url": "https://s3.eu-west-3.amazonaws.com/tinseau-image/uploads/cl8ijifig0001x5jxa79y4nlv.png",
// 				"identifier": "uploads/cl8ijifig0001x5jxa79y4nlv.png"
// 			}
// 		},
// 		"event": {
// 			"id": "5791ba48-4f05-4658-b1db-b9a403ce72ab",
// 			"title": "Journée du 28 mars",
// 			"date": "2022-09-15T22:00:00.000Z",
// 			"description": "qlsdklqskdqsdlqsdlqskdlqksd",
// 			"options": [
// 				{
// 					"name": "Accompagnateur",
// 					"price": 100,
// 					"settings": {
// 						"type": "number",
// 						"value": "0"
// 					}
// 				}
// 			],
// 			"circuit_id": "4d344d75-9e59-483b-8923-ddbacb82ce93",
// 			"track_access": {
// 				"id": "d106a62c-0406-47bb-be82-6f53f0de400f",
// 				"places": 65,
// 				"price": 550,
// 				"options": [
// 					{
// 						"name": "Coach dédié",
// 						"price": 200,
// 						"settings": {
// 							"type": "bool",
// 							"value": "false"
// 						}
// 					}
// 				],
// 				"event_id": "5791ba48-4f05-4658-b1db-b9a403ce72ab"
// 			},
// 			"locations": [
// 				{
// 					"id": "64806f0d-b9df-4668-bc78-83a628a8515e",
// 					"instances_amount": 5,
// 					"max_instances": 5,
// 					"exclusive_price": 5000,
// 					"instance_price": 500,
// 					"serie_format": "s4 t2",
// 					"options": [
// 						{
// 							"name": "Pilote supplémentaire",
// 							"price": 100,
// 							"dechargeable": "additional_driver",
// 							"settings": {
// 								"type": "number",
// 								"value": "0"
// 							}
// 						}
// 					],
// 					"event_id": "5791ba48-4f05-4658-b1db-b9a403ce72ab",
// 					"car_id": "29d65ceb-86cf-4691-8bbd-8fb8d6c275e5",
// 					"car": {
// 						"id": "29d65ceb-86cf-4691-8bbd-8fb8d6c275e5",
// 						"name": "bmw m3",
// 						"description": "lqkdlqsldkqsl dklq sdlkq sd",
// 						"images": [
// 							{
// 								"id": "96512882-7379-4f38-b0ce-be8b0445fe43",
// 								"title": "Voiture de location",
// 								"description": "Bmw m3",
// 								"type": "s3",
// 								"url": "https://s3.eu-west-3.amazonaws.com/tinseau-image/uploads/cl8ijsz0z000169jx8hx4ge7t.jpg",
// 								"identifier": "uploads/cl8ijsz0z000169jx8hx4ge7t.jpg"
// 							}
// 						]
// 					}
// 				}
// 			]
// 		},
// 		"order": {
// 			"type": "location",
// 			"options": [
// 				{
// 					"name": "Accompagnateur",
// 					"type": "number",
// 					"initalValue": "0",
// 					"value": 0
// 				}
// 			],
// 			"locations": [
// 				{
// 					"car_id": "29d65ceb-86cf-4691-8bbd-8fb8d6c275e5",
// 					"instance_amount": 1,
// 					"options": [
// 						{
// 							"name": "Pilote supplémentaire",
// 							"type": "number",
// 							"initalValue": "0",
// 							"value": 2
// 						}
// 					]
// 				}
// 			]
// 		}
// 	}
// ]


const OrderProvider: React.FC<Props> = ({ children }) => {

	const errorCtx = useErrorContext()

	const [items, setItems] = useState<OrderItem[]>([])

	const [bufferedItem, setBufferedItem] = useState<OrderItem | null>(null)
	const [removeItemId, setRemoveItemId] = useState<number[]>([])


	const [currentItemId, setCurrentItemId] = useState<number>(-1)
	const [currentLocationId, setCurrentLocationId] = useState<number>(-1)

	const [orderType, setOrderType] = useState<OrderType | null>(null)

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