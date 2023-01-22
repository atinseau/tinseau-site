

const useOption = (
	item: OrderItem | null,
	items: OrderItem[],
	currentLocationId: number,
	setItems: ReactDispatch<OrderItem[]>,
) => {

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

	return {
		addOption,
		updateOption
	}
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

export {
	optionTotal
}

export default useOption;