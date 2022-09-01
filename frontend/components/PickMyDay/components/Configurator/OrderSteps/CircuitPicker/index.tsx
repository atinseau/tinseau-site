import React, { useState } from "react"
import useCircuits from "../../../../hooks/useCircuits";
import CircuitCard from "./CircuitCard";
import { CircuitSorting, sortModes } from "./CircuitSorting";

interface Props {
	next: () => void
	prev: () => void
}


const CircuitPicker: React.FC<Props> = ({ next }) => {

	const [sortMode, setSortMode] = useState(sortModes[0])
	const circuits = useCircuits()

	return <div className="circuit__picker">

		<div className="circuit__picker__header">
			<h3>Choisissez votre circuit</h3>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ipsa excepturi, quo voluptas voluptatibus amet illo odio reiciendis a recusandae nisi optio adipisci dolorum necessitatibus, odit, non inventore temporibus obcaecati.</p>
		</div>

		<CircuitSorting setSortMode={setSortMode} sortMode={sortMode} />

		<div className="circuit__container">
			<ul>
				{circuits.map((circuit, i) => <CircuitCard
					onPick={next}
					circuit={circuit}
					key={i}
				/>)}
			</ul>
		</div>

	</div>
}

export default CircuitPicker;