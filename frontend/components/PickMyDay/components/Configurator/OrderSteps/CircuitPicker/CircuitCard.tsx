import Image from "next/future/image"
import React from "react"

import lemans from "@public/images/circuits/lemans.png"
import Button from "../../../../../Library/Button"

interface Props {
	onPick: () => void
}

const CircuitCard: React.FC<Props> = ({ onPick }) => {

	return <li className="circuit__card">

		<div className="circuit__card__header">
			<Image src={lemans} />
			<div className="info">
				<h2>qsdqsdqsdqsd</h2>
				<p>85 places restantes</p>
			</div>
			{/* <Button className="disabled" onClick={onPick}>Choisir</Button> */}
			<Button onClick={onPick}>Choisir</Button>
		</div>

		<div className="desc">
			<p>qsdqsdqsdsq</p>
			<h4>650€</h4>
		</div>

		<ul className="days">
			<li className="selected">
				{new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
			</li>
		</ul>


	</li>
}

export default CircuitCard