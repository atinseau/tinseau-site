import React from "react"
import Button from "src/components/Library/Button";

interface Props {
	next: () => void,
	back: () => void
}

const List: React.FC<Props> = ({ next, back }) => {
	return <div className="decharges list">

		<div className="decharges__header">
			<h4>Vos décharges de responsabilité</h4>
			<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ea vitae esse expedita iste aperiam ipsum atque odit non perspiciatis ratione est facilis eum corporis consequuntur, exercitationem sed nam amet.</p>
		</div>

		<div className="decharges__container">
			
		</div>

		<div className="decharges__footer">
			<Button onClick={next}>Crée une décharge de responsabilité</Button>
		</div>
	</div>
}

export default List;