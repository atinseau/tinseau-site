import { InformationCircleIcon } from "@heroicons/react/24/solid"
import React, { useEffect, useState } from "react"
import useOrderContext from "../../../../hooks/useOrderContext"
import OptionDisplayer from "./OptionDisplayer"

interface Props {
	next: () => void
	prev: () => void
}

const CircuitOptionPicker: React.FC<Props> = ({ prev }) => {

	const ctx = useOrderContext()

	return <div className="circuit__option__picker">
		<div className="picker__header">
			<h3>Ajouter des options</h3>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur quos vero, modi officia doloribus sapiente corrupti voluptates tempore asperiores aut dicta ex dolore iusto dolorem voluptatem, harum maiores. Quisquam, debitis!</p>
		</div>

		<div className="picker__container">
			<div className="selected">
				<p>Journée selectionnée:</p>
				<div>
					<InformationCircleIcon />
					<div>
						<h4>TEst</h4>
						<h5>qsdqsdqsdqsdqsd</h5>
					</div>
				</div>
			</div>
			<OptionDisplayer />
		</div>
	</div>
}

export default CircuitOptionPicker;