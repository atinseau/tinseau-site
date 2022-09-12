import React, { useMemo, useRef, useState } from "react"

import Image from "next/future/image";
import Button from "src/components/Library/Button";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import useDropdown from "src/hooks/useDropdown";
import { getEnvConfig } from "src/functions/getConfig";
import useOrderContext from "src/components/PickMyDay/hooks/useOrderContext";
import { getLocationByCarId } from "src/components/PickMyDay/contexts/OrderContext";

interface Props {
	location: TTDLocation
	onPick: (locationItem: LocationItem) => void
}

const LocationCard: React.FC<Props> = ({ location, onPick }) => {

	const ctx = useOrderContext()
	const serieFormat = useRef(location.serie_format.split("_").map((s) => parseInt(s[1])))
	const [open, toggle, ref] = useDropdown<HTMLUListElement>()
	const [serieId, setSerieId] = useState(0)

	const series = useMemo(() => {
		const output = []
		for (let i = 0; i < location.available_series; i++) {
			output.push({
				serie: serieFormat.current[0] * (i + 1),
				tours: serieFormat.current[1]
			})
		}
		return output
	}, [])

	const formatSeries = (serie: number, tours: number) => {
		if (serie / serieFormat.current[0] === location.available_series)
			return "Exclusivité sur la journée"
		return `${serie} séries ${tours} tours`
	}

	const images: Image[] = location.car.data.attributes.images.data

	return <li className="location__card">
		<Image src={getEnvConfig().SERVER_ADDRESS + images[0].attributes.url} width={images[0].attributes.width} height={images[0].attributes.height} />
		<div>
			<div>
				<div className="price">
					<div>
						<h3>{location.car.data.attributes.name}</h3>
						<p>{location.available_series} places restantes</p>
					</div>
					<div>
						<div className="format__dropdown" onClick={toggle}>
							<p>{formatSeries(series[serieId].serie, series[serieId].tours)}</p>
							<ChevronDownIcon />

							{open && <ul ref={ref}>
								{series.map((serie, i) => <li key={i} onClick={() => setSerieId(i)}>
									{formatSeries(serie.serie, serie.tours)}
								</li>)}
							</ul>}
						</div>
						<h4>{serieId < series.length - 1 ? location.serie_price * (serieId + 1) : location.exclusive_price}€</h4>
					</div>
				</div>
				<p>{location.car.data.attributes.description}</p>
			</div>
			<Button 
				onClick={() => onPick({car_id: location.car.data.id as string, serie_count: series[serieId].serie / serieFormat.current[0]})}
				className={((ctx.item as OrderItem).order.locations || []).find((locItem, i) => locItem.car_id === location.car.data.id) ? "disabled" : ""}
			>
					Choisir
			</Button>
		</div>
	</li>
}

export default LocationCard;