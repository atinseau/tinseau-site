import React, { useEffect, useMemo, useRef, useState } from "react"
import { getLocationByCarId } from "src/contexts/OrderContext"
import useOrderContext from "src/hooks/useOrderContext"


const useDechargeItem = (selectedEvent: number) => {

	const orderCtx = useOrderContext()

	const dechargeableItem: DechargeableItem = useMemo(() => {
		const item = orderCtx.items[selectedEvent]
		if (item.order.type === "location") {
			return {
				name: "Location",
				required_amount: 1,
				type: "location"
			}
		} else {
			return {
				name: "Accés piste",
				required_amount: item.order.track_access?.count || 1,
				type: "track_access"
			}
		}
	}, [selectedEvent])

	return {
		dechargeableItem
	}
}


export default useDechargeItem;