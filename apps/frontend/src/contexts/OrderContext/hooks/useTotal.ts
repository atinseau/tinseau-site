import { getLocationByCarId } from ".."
import { optionTotal } from "./useOption"

const useTotal = (items: OrderItem[]) => {
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

	return {
		getTotal
	}
}


export default useTotal;