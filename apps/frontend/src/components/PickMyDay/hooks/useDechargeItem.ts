import React, { useEffect, useMemo, useRef, useState } from "react"
import { getLocationByCarId } from "src/contexts/OrderContext"
import useOrderContext from "src/hooks/useOrderContext"

const extractDechargeableOptions = (dbOptions: TTDOption[], options: OrderOption[]) => {
	const extractedOptions: DechargeableItem[] = []
	for (const option of dbOptions) {
		if (option.dechargeable) {
			const optionItem = options.find(o => o.name === option.name)
			if (optionItem && (optionItem.value)) {
				extractedOptions.push({
					name: option.name,
					required_amount: option.settings.type === "bool" ? 1 : optionItem.value,
					type: "additionnal_driver"
				})
			}
		}
	}
	return extractedOptions
}


const useDechargeItem = (selectedEvent: number, eventsPayload: EventsPayload, setEventsPayload: (value: EventsPayload) => void) => {

	const orderCtx = useOrderContext()

	const eventPayloadEventRef = useRef({ selectedDechargeableItemChanged: false })

	const dechargeableItems: DechargeableItem[] = useMemo(() => {
		const items: DechargeableItem[] = []
		const item = orderCtx.items[selectedEvent]

		if (item.order.type === "location") {
			items.push({
				name: "Location",
				required_amount: 1,
				type: "location"
			})
		} else if (item.order.type === "ttd") {
			items.push({
				name: "Accés piste",
				required_amount: item.order.track_access?.count || 1,
				type: "track_access"
			})
		}

		items.push(...extractDechargeableOptions(item.event.options, item.order.options))
		items.push(...extractDechargeableOptions(item.event.track_access.options, item.order.track_access?.options || []))
		for (const locationItem of item.order.locations || []) {
			const location = getLocationByCarId(locationItem.car_id, item.event.locations)
			if (!location) continue
			items.push(...extractDechargeableOptions(location.options, locationItem.options))
		}
		return items
	}, [selectedEvent])

	const setSelectedDechargeableItem = (index: number) => {
		eventsPayload[orderCtx.items[selectedEvent].event.id].selectedDechargeableItem = index
		eventPayloadEventRef.current.selectedDechargeableItemChanged = true
		setEventsPayload({ ...eventsPayload })
	}

	const selectedDechargeableItem = useMemo(() => {
		return eventsPayload[orderCtx.items[selectedEvent].event.id].selectedDechargeableItem
	}, [selectedEvent, eventsPayload])

	useEffect(() => {

		if (eventPayloadEventRef.current.selectedDechargeableItemChanged) {
			eventsPayload[orderCtx.items[selectedEvent].event.id].meta = {}
			eventPayloadEventRef.current.selectedDechargeableItemChanged = false
			setEventsPayload({ ...eventsPayload })
		}

	}, [eventsPayload])

	return {
		dechargeableItems,
		selectedDechargeableItem,
		setSelectedDechargeableItem
	}
}


export default useDechargeItem;