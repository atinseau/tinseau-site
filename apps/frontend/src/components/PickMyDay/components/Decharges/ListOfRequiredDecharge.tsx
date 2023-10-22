import React, { memo } from "react";
import { RiMailSendLine } from "react-icons/ri";
import { Button } from "src/components/Library";

interface Props {
	items: OrderItem[]
	selectedEvent: TTDEvent
	dechargeableItem: DechargeableItem
	setSelectedEvent: (index: number) => void
}

const ListOfRequiredDecharge: React.FC<Props> = ({
	items,
	selectedEvent,
	setSelectedEvent,
}) => {


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

		<Button variant={"primary"}>
			Continuer
			<RiMailSendLine />
		</Button>
	</div>

}

export default memo(ListOfRequiredDecharge);