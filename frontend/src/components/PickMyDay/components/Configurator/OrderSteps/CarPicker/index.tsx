import Sorting, { defaultSortModes } from "src/components/Library/Sorting";
import React, { useState } from "react"
import LocationCard from "./LocationCard";
import useOrderContext from "src/components/PickMyDay/hooks/useOrderContext";

interface Props {
	next: () => void
}

const CarPicker: React.FC<Props> = ({ next }) => {

	const [sortMode, setSortMode] = useState(defaultSortModes[0])

	const ctx = useOrderContext()

	const locations = ctx.item ? ctx.item.event.attributes.locations : null

	return <div className="car__picker">
		<div className="car__picker__header">
			<h3>Choissisez votre voiture</h3>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur odio quidem sequi ut, esse ipsum explicabo itaque sed eveniet repellat. Magnam asperiores sequi est cumque optio, quisquam earum nisi reprehenderit?</p>
		</div>

		<Sorting sortModes={defaultSortModes} sortMode={sortMode} setSortMode={setSortMode} />

		<div className="car__container">
			<ul>
				{locations && locations.map((location, i) => <LocationCard
					onPick={(location) => ctx.addLocation(location) && next()}
					key={i}
					location={location}
				/>)}
			</ul>
		</div>

	</div>
}

export default CarPicker;