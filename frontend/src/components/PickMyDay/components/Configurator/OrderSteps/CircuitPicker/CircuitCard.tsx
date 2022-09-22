import Image from "next/future/image"
import React, { useEffect, useMemo, useState } from "react"

import Button from "../../../../../Library/Button"
import useOrderContext from "src/components/PickMyDay/hooks/useOrderContext"
import { getEnvConfig } from "src/functions/getConfig"

interface Props {
	onPick: (e: {circuit: TTDCircuit, event: TTDEvent}) => void
	circuit: TTDCircuit
}

const CircuitCard: React.FC<Props> = ({ onPick, circuit }) => {

	
	const [selectedEventId, setSelectedEventId] = useState(0)
	
	const ctx = useOrderContext()
	
	const selectedEvent = useMemo(() => {
		let event = circuit.events.at(selectedEventId)
		if (!event) {
			event = circuit.events[0]
			setSelectedEventId(0)
		}
		return event 
	}, [selectedEventId, circuit])

	// placeholder logo
	const logo = "https://placehold.it/200x200"

	return <li className="circuit__card">

		<div className="circuit__card__header">
			<Image src={logo} width={100} height={100}/>
			<div className="info">
				<h2>{circuit.name}</h2>
				{ctx.orderType === "ttd"  && <p>{selectedEvent.track_access.places} places restantes</p>}
				{ctx.orderType === "location" && <p>{(() => {
					const locationsCount = selectedEvent.locations.filter((loc) => loc.instances_amount > 0).length
					return locationsCount === 1 ? "Une location restante !": locationsCount + " locations restantes"
				})()}</p>}
			</div>
			<Button 
				onClick={() => onPick({circuit, event: selectedEvent})}
				variant={ctx.items.find((item) => item.event.id === selectedEvent.id) ? "disabled": "primary"}
			>
				Choisir
			</Button>
		</div>

		<div className="desc">
			<p>{circuit.description}</p>
			{ctx.orderType === "ttd" && <h4>{selectedEvent.track_access.price}€</h4>}
		</div>

		<ul className="days">
			{circuit.events.map((event, i) => <li 
				className={i === selectedEventId ? "selected": ""} 
				key={i}
				onClick={() => setSelectedEventId(i)}
			>
				{new Date(event.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
			</li>)}
		</ul>


	</li>
}

export default CircuitCard