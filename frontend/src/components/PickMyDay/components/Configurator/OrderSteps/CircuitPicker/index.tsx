import Sorting, { defaultSortModes } from "src/components/Library/Sorting";
import useOrderContext from "src/components/PickMyDay/hooks/useOrderContext";
import React, { useState } from "react"
import CircuitCard from "./CircuitCard";

interface Props {
	next: () => void
	prev: () => void
}


const CircuitPicker: React.FC<Props> = ({ next }) => {

	const [sortMode, setSortMode] = useState(defaultSortModes[0])

	const ctx = useOrderContext()

	return <div className="circuit__picker">

		<div className="circuit__picker__header">
			<h3>Choisissez votre circuit</h3>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ipsa excepturi, quo voluptas voluptatibus amet illo odio reiciendis a recusandae nisi optio adipisci dolorum necessitatibus, odit, non inventore temporibus obcaecati.</p>
		</div>

		<Sorting setSortMode={setSortMode} sortModes={defaultSortModes} sortMode={sortMode} />

		<div className="circuit__container">
			<ul>
				{ctx.circuits.data && ctx.circuits.data.map((circuit, i) => <CircuitCard
					onPick={(e) => ctx.createItem(e.circuit, e.event) && next()}
					circuit={circuit}
					key={i}
				/>)}
			</ul>
		</div>

	</div>
}

export default CircuitPicker;