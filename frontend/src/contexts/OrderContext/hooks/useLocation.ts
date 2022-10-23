import { useMemo } from "react"
import { useErrorContext } from "src/hooks"
import { getLocationByCarId } from ".."


const useLocation = (
	item: OrderItem | null,
	items: OrderItem[],
	currentLocationId: number,
	setCurrentLocationId: ReactDispatch<number>,
	setItems: ReactDispatch<OrderItem[]>,
) => {

	const errorCtx = useErrorContext()

	const location = useMemo(() => {
		if (!item || currentLocationId == -1 || (!item.order.locations?.length)) return null
		return getLocationByCarId(item.order.locations[currentLocationId].car_id, item.event.locations)
	}, [item, currentLocationId])


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

	return {
		location,
		addLocation
	}
}

export default useLocation;