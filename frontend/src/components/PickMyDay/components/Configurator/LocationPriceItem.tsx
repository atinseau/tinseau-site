import React from "react"
import { getLocationByCarId } from "src/contexts/OrderContext"
import OptionResumeRender from "./OptionResumeRender"

interface Props {
	orderItem: OrderItem
	currentLocationId: number
	eventId: string
}

const LocationPriceItem: React.FC<Props> = ({ orderItem, currentLocationId, eventId }) => {

	return <ul>
		{(orderItem.order.locations || []).map((locationItem, i) => {

			const location = getLocationByCarId(locationItem.car_id, orderItem.event.locations) as TTDLocation
			const isExclusive = locationItem.instance_amount === location.max_instances

			return <li key={i} className="location__item">
				<div>
					<p>
						{i === currentLocationId && orderItem.event.id === eventId && (orderItem.order.locations || []).length > 1 && <span className="current__location" />}
						<span className="mr-1">{location.car.name}</span>
						<span className="text-white">({
							isExclusive ?
								"Exclusivité" :
								locationItem.instance_amount * parseInt(location.serie_format[1]) + " série de " + location.serie_format[4] + " tours"
						})</span>
					</p>

					<p>{isExclusive ? location.exclusive_price : locationItem.instance_amount * location.instance_price}€</p>
				</div>

				<ul>
					<OptionResumeRender
						dbOptions={location.options}
						options={locationItem.options}
						order={orderItem.order}
					/>
				</ul>
			</li>
		})}
	</ul>
}

export default LocationPriceItem;