import Image from "next/future/image"
import React, { useEffect, useState } from "react"

import lemans from "@public/images/circuits/lemans.png"
import Button from "../../../../../Library/Button"
import useOrderContext from "../../../../hooks/useOrderContext"

interface Props {
	circuit: Circuit
	onPick: () => void
}

const CircuitCard: React.FC<Props> = ({ circuit, onPick }) => {

	const ctx = useOrderContext()

	const [selectedEvent, setSelectedEvent] = useState(0)

	const insertItem = () => {
		if (ctx.insertItem(circuit,circuit.events[selectedEvent]))
			onPick()
	}

	const selectedIsAlreadyChoose = () => {
		return ctx.getCurrentItem() && circuit.events[selectedEvent].id == ctx.getCurrentItem()?.event.id
	}

	return <li className="circuit__card">

		<div className="circuit__card__header">
			<Image src={lemans} />
			<div className="info">
				<h2>{circuit.title}</h2>
				<p>{circuit.events[selectedEvent].places} places restantes</p>
			</div>
			<Button onClick={insertItem} className={selectedIsAlreadyChoose() ? "disabled": ""}>Choisir</Button>
		</div>

		<div className="desc">
			<p>{circuit.events[selectedEvent].desc}</p>
			<h4>{circuit.events[selectedEvent].base.price}€</h4>
		</div>

		<ul className="days">
			{circuit.events.map((event, i) => <li onClick={() => setSelectedEvent(i)} key={i} className={i == selectedEvent ? "selected": ""}>
				{event.date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
			</li>)}
		</ul>


	</li>
}

export default CircuitCard