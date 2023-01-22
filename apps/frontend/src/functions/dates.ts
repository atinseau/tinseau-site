

function orderByClosestDate<T>(items: Array<T>, getItemDate: (item: T) => Date, order: "asc" | "desc" = "asc") {
	const sortedItems = []
	const diffs: number[] = []
	const current = new Date()

	for (const item of items) {
		const date = getItemDate(item)

		console.log(date)

		if (date < current) continue
		diffs.push(date.getTime() - current.getTime())
	}

	while (diffs.length) {
		const min = diffs.pop()
		if (!min) break;

		const item = items.find(item =>
			getItemDate(item).getTime() - current.getTime() === min
		)
		if (!item) break;
		sortedItems.push(item)
	}
	return order === "asc" ? sortedItems.reverse() : sortedItems
}


export {
	orderByClosestDate
}