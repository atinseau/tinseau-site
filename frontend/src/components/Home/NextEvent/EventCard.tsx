import React from "react"
import Button from "../../Library/Button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";


interface Props {
	event: {
		title: string
		description: string
	}
}

const EventCard: React.FC<Props> = ({ event }) => {
	return <div className="event__card">
		<h2>{event.title}</h2>
		<p>{event.description}</p>
		<Button>
			En savoir plus
			<ArrowRightIcon />
		</Button>
	</div>
}

export default EventCard;