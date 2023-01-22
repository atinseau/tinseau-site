import React from "react"
import { HiStar } from "react-icons/hi";

const Meta = () => {
	return <ul className="meta__metadata">
		<li>
			<h4>1<span>min</span> 41<span>s</span></h4>
			<p>Temps</p>
		</li>

		<li>
			<h4>3,56<span>km</span></h4>
			<p>Longueur</p>
		</li>

		<li>
			<h4>260<span>km/h</span></h4>
			<p>Vmax</p>
		</li>

		<li>
			<div className="icon">
				<HiStar />
				<h4>5</h4>
			</div>
			<p>Niveau</p>
		</li>
	</ul>
}

export default Meta;