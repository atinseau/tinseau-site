import Sorting from "src/components/Library/Sorting";
import useOrderContext from "src/components/PickMyDay/hooks/useOrderContext";
import React, { useEffect, useMemo, useState } from "react"
import CircuitCard from "./CircuitCard";
import { orderByClosestDate } from "src/functions/dates";

interface Props {
	next: () => void
	prev: () => void
}

const sortModes: SortMode[] = [
	{
		label: "Par date",
		value: "date",
	},
	{
		label: "Par prix",
		value: "price",
	}
]

const CircuitPicker: React.FC<Props> = ({ next }) => {

	const [sortMode, setSortMode] = useState<SortMode | null>(null)

	const ctx = useOrderContext()

	const circuits = useMemo(() => {
		switch (sortMode?.value) {
			case "date": {
				const circuits = structuredClone(ctx.circuits)
				for (const circuit of circuits.data)
					circuit.attributes.events.data = orderByClosestDate(circuit.attributes.events.data, (event) => new Date(event.attributes.date))
				return {
					...ctx.circuits,
					data: orderByClosestDate(circuits.data, (circuit) => new Date(circuit.attributes.events.data[0].attributes.date)).reverse()
				}
			} case "price": {
				if (ctx.orderType === "location")
					return ctx.circuits
				const circuits = structuredClone(ctx.circuits)

				for (const circuit of circuits.data) {
					circuit.attributes.events.data.sort((a, b) => {
						return a.attributes.classic.price - b.attributes.classic.price
					})
				}

				circuits.data.sort((a, b) => {
					return a.attributes.events.data[0].attributes.classic.price + b.attributes.events.data[0].attributes.classic.price
				})
				return circuits
			}
			default: return ctx.circuits
		}
	}, [sortMode, ctx.circuits])

	return <div className="circuit__picker">

		<div className="circuit__picker__header">
			<h3>Choisissez votre circuit</h3>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ipsa excepturi, quo voluptas voluptatibus amet illo odio reiciendis a recusandae nisi optio adipisci dolorum necessitatibus, odit, non inventore temporibus obcaecati.</p>
		</div>

		<Sorting
			setSortMode={setSortMode}
			sortModes={sortModes.filter((mode) => ctx.orderType === "location" && mode.value === "price" ? false : true)}
			sortMode={sortMode}
		/>

		<div className="circuit__container">
			<ul>
				{circuits.data && circuits.data.map((circuit, i) => <CircuitCard
					onPick={(e) => ctx.createItem(e.circuit, e.event) && next()}
					circuit={circuit}
					key={i}
				/>)}
			</ul>
		</div>

	</div>
}

export default CircuitPicker;