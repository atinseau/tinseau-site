import React from "react"
import { HiArrowRight } from "react-icons/hi";
import { Button } from "src/components/Library";


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
			<HiArrowRight />
		</Button>
	</div>
}

export default EventCard;