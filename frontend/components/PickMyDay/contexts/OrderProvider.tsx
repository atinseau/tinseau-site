import { useCallback, useEffect, useState } from "react"
import OrderContext from "./OrderContext"

interface Props {
	children: React.ReactNode
}

const OrderProvider: React.FC<Props> = ({ children }) => {

	const [items, setItems] = useState<OrderItem[]>([])
	const [currentItemId, setCurrentItemId] = useState(-1)

	const insertItem = useCallback((circuit: Circuit, event: TTDEvent) => {
		if (items.length && items.find(item => item.event.id === event.id))
			return false
		setCurrentItemId(items.length)
		setItems([...items, {
			circuit,
			event,
			options: {
				additionnal_drivers: 0,
				follower: 0,
				meal: 0,
				runway_access: 1,
				coach: {
					dedicated: false,
					used: false
				}
			}
		}])
		return true
	}, [items])

	const getTotal = useCallback(() => {
		let total = 0
		for (const item of items) {
			total += item.options.additionnal_drivers * item.event.options_pricing.additionnal_drivers
			total += item.options.follower * item.event.options_pricing.follower
			total += item.options.meal * item.event.options_pricing.meal
			total += item.options.runway_access * item.event.base.price

			if (item.options.coach.used) {
				if (item.options.coach.dedicated) total += item.event.options_pricing.coach.dedicated
				else total += item.event.options_pricing.coach.used
			}
		}
		return parseFloat(total.toFixed(2))
	}, [items])

	const getCurrentItem = () => {
		if (!items.length)
			return null
		return items[currentItemId]
	}

	const setCurrentItem = (item: OrderItem) => {
		setItems((items) => {
			items[currentItemId] = item
			return [...items]
		})
	}

	return <OrderContext.Provider value={{
		items,
		getTotal,
		insertItem,
		getCurrentItem,
		setCurrentItem
	}}>
		{children}
	</OrderContext.Provider>
}

export default OrderProvider;