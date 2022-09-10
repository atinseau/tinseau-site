import Image from "next/future/image"
import React, { useEffect, useMemo, useState } from "react"

import Button from "../../../../../Library/Button"
import useOrderContext from "src/components/PickMyDay/hooks/useOrderContext"

interface Props {
	onPick: (e: {circuit: Circuit, event: TTDEvent}) => void
	circuit: Circuit
}

const CircuitCard: React.FC<Props> = ({ onPick, circuit }) => {

	
	const [selectedEventId, setSelectedEventId] = useState(0)
	
	const ctx = useOrderContext()
	const selectedEvent = useMemo(() => circuit.attributes.events.data[selectedEventId], [selectedEventId])

	const logo = circuit.attributes.logo.data.attributes

	return <li className="circuit__card">

		<div className="circuit__card__header">
			<Image src={"http://localhost:1337" + logo.url} width={logo.width} height={logo.height}/>
			<div className="info">
				<h2>{circuit.attributes.title}</h2>
				<p>{selectedEvent.attributes.places} places restantes</p>
			</div>
			{/* <Button className="disabled" onClick={onPick}>Choisir</Button> */}
			<Button onClick={() => onPick({circuit, event: circuit.attributes.events.data[selectedEventId]})}>Choisir</Button>
		</div>

		<div className="desc">
			<p>{circuit.attributes.description}</p>
			{ctx.orderType === "ttd" && <h4>{selectedEvent.attributes.classic.price}€</h4>}
		</div>

		<ul className="days">
			{circuit.attributes.events.data.map((event, i) => <li 
				className={i === selectedEventId ? "selected": ""} 
				key={i}
				onClick={() => setSelectedEventId(i)}
			>
				{new Date(event.attributes.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
			</li>)}
		</ul>


	</li>
}

export default CircuitCard