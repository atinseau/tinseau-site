import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { HiCreditCard } from "react-icons/hi";
import { RiMailSendLine } from "react-icons/ri";
import { Button } from "src/components/Library";

interface Props {
	items: OrderItem[]
	selectedEvent: TTDEvent
	dechargeableItems: DechargeableItem[]
	eventsPayload: { [key: string]: any }
	setSelectedEvent: (index: number) => void
}

const ListOfRequiredDecharge: React.FC<Props> = ({
	items,
	selectedEvent,
	eventsPayload,
	dechargeableItems,
	setSelectedEvent,
}) => {

	const dechargeIsDone = useCallback((id: string) => {
		if (eventsPayload[id]?.type === "additionnal_driver" && eventsPayload[id]?.additionnal_driver_agreement)
			return true
		return false
	}, [eventsPayload])

	const dechargeIsDoneForAll = useMemo(() => {
		return items.every((e) => dechargeIsDone(e.event.id))
	}, [eventsPayload])


	return <div className="right">
		<h4>à fourir pour: </h4>

		<ul className="event__list">
			{items.map((item, i) => <li key={i} onClick={() => setSelectedEvent(i)}>
				<div>
					<h5>{item.event.id === selectedEvent.id && <span className="current" />} {item.event.title}</h5>
					<h6>{item.circuit.name}</h6>
				</div>
				<Button variant={item.event.id === selectedEvent.id ? "disabled" : "primary"}>Fournir</Button>
			</li>)}
		</ul>

		<Button variant={dechargeIsDoneForAll ? "primary": "disabled"}>
			Continuer
			<RiMailSendLine />
		</Button>
	</div>

}

export default ListOfRequiredDecharge;