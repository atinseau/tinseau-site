import Image from "next/future/image"
import React, { useEffect, useMemo, useState } from "react"

import Button from "../../../../../Library/Button"
import useOrderContext from "src/components/PickMyDay/hooks/useOrderContext"
import { getEnvConfig } from "src/functions/getConfig"

interface Props {
	onPick: (e: {circuit: Circuit, event: TTDEvent}) => void
	circuit: Circuit
}

const CircuitCard: React.FC<Props> = ({ onPick, circuit }) => {

	
	const [selectedEventId, setSelectedEventId] = useState(0)
	
	const ctx = useOrderContext()
	const selectedEvent = useMemo(() => {
		let event = circuit.attributes.events.data.at(selectedEventId)
		if (!event) {
			event = circuit.attributes.events.data[0]
			setSelectedEventId(0)
		}
		return event 
	}, [selectedEventId, circuit])

	const logo = circuit.attributes.logo.data.attributes

	return <li className="circuit__card">

		<div className="circuit__card__header">
			<Image src={getEnvConfig().SERVER_ADDRESS + logo.url} width={logo.width} height={logo.height}/>
			<div className="info">
				<h2>{circuit.attributes.title}</h2>
				{ctx.orderType === "ttd"  && <p>{selectedEvent.attributes.places} places restantes</p>}
				{ctx.orderType === "location" && <p>{(() => {
					const locationsCount = selectedEvent.attributes.locations.filter((loc) => loc.available_series > 0).length
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