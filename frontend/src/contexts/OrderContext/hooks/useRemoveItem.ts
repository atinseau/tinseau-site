import { useState } from "react"


const useRemoveItem = (
	currentItemId: number,
	item: OrderItem | null,
	items: OrderItem[],
	setBufferedItem: ReactDispatch<OrderItem | null>,
	setCurrentItemId: ReactDispatch<number>,
	setItems: ReactDispatch<OrderItem[]>
) => {
	const [removeItemId, setRemoveItemId] = useState<number[]>([])

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

	return {
		removeItemId,
		updateRemoveItemId,
		clearRemoveItem
	}
}

export default useRemoveItem