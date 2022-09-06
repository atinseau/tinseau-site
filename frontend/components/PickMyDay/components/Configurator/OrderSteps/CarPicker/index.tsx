import Sorting, { defaultSortModes } from "components/Library/Sorting";
import React, { useState } from "react"
import CarCard from "./CarCard";

interface Props {

}


const sortModes: SortMode[] = [
	{
		label: "Par date",
		value: "date",
	}
]

const CarPicker: React.FC<Props> = () => {

	const [sortMode, setSortMode] = useState(defaultSortModes[0])

	return <div className="car__picker">
		<div className="car__picker__header">
			<h3>Choissisez votre voiture</h3>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur odio quidem sequi ut, esse ipsum explicabo itaque sed eveniet repellat. Magnam asperiores sequi est cumque optio, quisquam earum nisi reprehenderit?</p>
		</div>

		<Sorting sortModes={defaultSortModes} sortMode={sortMode} setSortMode={setSortMode} />

		<div className="car__container">
			<ul>
				<CarCard/>
				<CarCard/>
			</ul>
		</div>

	</div>
}

export default CarPicker;