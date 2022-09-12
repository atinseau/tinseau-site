import React from "react"
import { getLocationByCarId } from "../../contexts/OrderContext"

interface Props {
	orderItem: OrderItem
}

const LocationPriceItem: React.FC<Props> = ({ orderItem }) => {

	return <ul>
		{(orderItem.order.locations || []).map((locationItem, i) => {

			const location = getLocationByCarId(locationItem.car_id, orderItem.event.attributes.locations) as TTDLocation
			const isExclusive = locationItem.serie_count === location.available_series

			return <li key={i} className="location__item">
				<p>
					<span className="mr-1">{location.car.data.attributes.name}</span>
					<span className="text-white">({
						isExclusive ?
							"Exclusivité" :
							locationItem.serie_count * parseInt(location.serie_format[1]) + " série de " + location.serie_format[4] + " tours"
					})</span>
				</p>

				<p>{isExclusive ? location.exclusive_price : locationItem.serie_count * location.serie_price}€</p>
			</li>
		})}
	</ul>
}

export default LocationPriceItem;