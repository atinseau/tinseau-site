import React from "react"

interface Props {
	item: OrderItem
}

const OrderPriceItem: React.FC<Props> = ({ item }) => {

	const getPriceList = () => {
		const prices = []

		prices.push({
			label: "Accés piste",
			count: item.options.runway_access,
			total: item.options.runway_access * item.event.base.price
		})

		for (const key of Object.keys(item.options)) {
			if (key == "runway_access" || key == "coach")
				continue
			
			let label = ""
			switch(key) {
				case "meal":
					label = "Repas"
					break
				case "additionnal_drivers":
					label = "Pilote supplémentaire"
					break
				case "follower":
					label = "Accompagnateur"
					break
			}

			if (item.options[key] === 0 && item.event.base.included_option[key] === 0)
				continue

			prices.push({
				label,
				count: item.options[key] + (item.event.base.included_option[key] * item.options.runway_access),
				total: item.options[key] * item.event.options_pricing[key]
			})
		}
		return prices
	}

	return <li>
		<h5>{item.circuit.title} <span>{item.event.title}</span></h5>
		<ul>
			{getPriceList().map((price, i) => <li key={i}>
				<p><span className="mr-1">{price.label} </span><span className="text-white">(x{price.count})</span></p>
				<p>{price.total.toFixed(2)}€</p>
			</li>)}
		</ul>
	</li>
}

export default OrderPriceItem;