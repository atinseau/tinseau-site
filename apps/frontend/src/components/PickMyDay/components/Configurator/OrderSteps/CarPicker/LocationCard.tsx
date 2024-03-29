import React, { useEffect, useMemo, useRef, useState } from "react"

import Image from "next/image";
import { Button } from "src/components/Library";

import { HiChevronDown } from "react-icons/hi";
import { useDropdown, useOrderContext } from "src/hooks";
import Picture from "src/components/Library/Picture";

interface Props {
	location: TTDLocation
	onPick: (locationItem: TTDLocationItem) => void
}

const LocationCard: React.FC<Props> = ({ location, onPick }) => {

	const ctx = useOrderContext()
	const serieFormat = useRef(location.serie_format.split(" ").map((s) => parseInt(s[1])))
	const [open, toggle, ref] = useDropdown<HTMLUListElement>()
	const [serieId, setSerieId] = useState(0)


	const instances = useMemo(() => {
		const output = []
		for (let i = 0; i < location.instances_amount; i++) {
			output.push({
				serie: serieFormat.current[0] * (i + 1),
				tours: serieFormat.current[1]
			})
		}
		return output
	}, [])

	const formatSeries = (serie: number, tours: number) => {
		if (serie / serieFormat.current[0] === location.max_instances)
			return "Exclusivité sur la journée"
		return `${serie} séries ${tours} tours`
	}

	const images = location.car.images

	return <div className="location__card">
		<Picture image={images[0]} width={1920} height={1080} />
		<div>
			<div>
				<div className="price">
					<div>
						<h3>{"test"}</h3>
						<p>{location.instances_amount} places restantes</p>
					</div>
					<div>
						<div className="format__dropdown" onClick={toggle}>
							<p>{formatSeries(instances[serieId].serie, instances[serieId].tours)}</p>
							<HiChevronDown />

							{open && <ul ref={ref}>
								{instances.map((instance, i) => <li key={i} onClick={() => setSerieId(i)}>
									{formatSeries(instance.serie, instance.tours)}
								</li>)}
							</ul>}
						</div>
						<h4>{serieId + 1 !== location.max_instances ? location.instance_price * (serieId + 1) : location.exclusive_price}€</h4>
					</div>
				</div>
				<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum accusantium atque quam, est doloremque corporis modi ducimus omnis? Facilis asperiores vel, adipisci accusantium quod similique dolores suscipit at sit nam.</p>
			</div>
			<Button
				onClick={() => onPick({
					car_id: location.car.id as string,
					id: location.id,
					instance_amount: instances[serieId].serie / serieFormat.current[0]
				})}
				variant={((ctx.item as OrderItem).order.locations || []).find((locItem, i) => locItem.car_id === location.car.id) ? "disabled" : "primary"}
			>
				Choisir
			</Button>
		</div>
	</div>
}

export default LocationCard;