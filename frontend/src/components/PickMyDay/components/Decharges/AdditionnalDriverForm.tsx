import React, { useEffect } from "react";
import { Switch } from "src/components/Library";

interface Props {
	eventsPayload: EventsPayload
	selectedEvent: TTDEvent
	setEventsPayload: (value: EventsPayload) => any
}

const AdditionnalDriverForm: React.FC<Props> = ({ eventsPayload, selectedEvent, setEventsPayload }) => {

	useEffect(() => {
		console.log(eventsPayload)
	}, []) 

	return <div className="additionnal__driver__form">
		<p>
			En tant que pilote supplémentaire vous vous engager à remplir votre décharge de responsabilité
			une fois que le pilote principale aura complété la sienne. la procédure ce fera par email que vous fournirez à l'etape suivante.
		</p>
		<div>
			<Switch onChange={(e) => {
				if (e) {
					eventsPayload[selectedEvent.id].meta.additionnal_driver_agreement = e
					setEventsPayload({...eventsPayload})
				} else {
					delete eventsPayload[selectedEvent.id].meta.additionnal_driver_agreement
					setEventsPayload({...eventsPayload})
				}
			}} value={eventsPayload[selectedEvent.id].meta.additionnal_driver_agreement || false}/>
			<p>Je m'engage à suivre la procédure</p>
		</div>
	</div>
}

export default AdditionnalDriverForm;