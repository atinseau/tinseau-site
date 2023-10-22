import Image from "next/image"
import React, { useMemo, useState } from "react"
import { Button } from "src/components/Library"
import Picture from "src/components/Library/Picture"
import { getEnvConfig } from "src/functions/getConfig"
import { useOrderContext } from "src/hooks"


interface Props {
	onPick: (e: { circuit: TTDCircuit, event: TTDEvent }) => void
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
	return <li className="circuit__card">

		<div className="circuit__card__header">
			<Picture image={circuit.logo} width={80} height={40} />
			<div className="info">
				<h2>{circuit.name}</h2>
				{ctx.orderType === "ttd" && <p>{selectedEvent.track_access.places} places restantes</p>}
				{ctx.orderType === "location" && <p>{(() => {
					const locationsCount = selectedEvent.locations.filter((loc) => loc.instances_amount > 0).length
					return locationsCount === 1 ? "Une location restante !" : locationsCount + " locations restantes"
				})()}</p>}
			</div>
			<Button
				onClick={() => onPick({ circuit, event: selectedEvent })}
				variant={ctx.items.find((item) => item.event.id === selectedEvent.id) ? "disabled" : "primary"}
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
				className={i === selectedEventId ? "selected" : ""}
				key={i}
				onClick={() => setSelectedEventId(i)}
			>
				{new Date(event.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
			</li>)}
		</ul>


	</li>
}

export default CircuitCard