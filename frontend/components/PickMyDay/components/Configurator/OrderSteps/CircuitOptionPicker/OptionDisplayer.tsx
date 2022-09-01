import React from "react"
import OptionItem from "./OptionItem"

interface Props {
	orderItem: OrderItem
	setOrderItem: (item: OrderItem) => void
}

const OptionDisplayer: React.FC<Props> = ({ orderItem, setOrderItem }) => {

	const setOptions = (options: { key: string, value: number }[]) => {
		for (const option of options) {

			if (option.key === "coach_option")
				continue
			if (option.key === "runway_access" && option.value === 0)
				continue

			orderItem.options[option.key] = option.value
		}
		setOrderItem(orderItem)
	}

	return <ul>

		{[
			{
				label: "Accés piste",
				value: orderItem.options.runway_access,
				price: orderItem.event.base.price,
				desc: "salut",
				key: "runway_access"
			},
			{
				label: "Repas supplémentaire",
				value: orderItem.options.meal,
				price: orderItem.event.options_pricing.meal,
				desc: "dzlut",
				key: "meal"
			},
			{
				label: "Pilote supplémentaire",
				value: orderItem.options.additionnal_drivers,
				price: orderItem.event.options_pricing.additionnal_drivers,
				desc: "dzlut",
				key: "additionnal_drivers"
			},
			{
				label: "Accompagnateur",
				value: orderItem.options.follower,
				price: orderItem.event.options_pricing.follower,
				desc: "dzlut",
				key: "follower"
			}
		].map((optionConfig) => {

			let min = 0
			let max = undefined

			if (optionConfig.key === "runway_access") {
				min = 1
				if (orderItem.event.base.max_per_person) {
					let max_per_person = orderItem.event.base.max_per_person
					if (orderItem.event.places - max_per_person < 0) max = orderItem.event.places
					else max = max_per_person
				}
				if (!max) max = orderItem.event.places
			}

			return <OptionItem
				key={optionConfig.key}
				option={optionConfig}
				min={min}
				max={max}
				changeOption={(key, value) => setOptions([{ key, value }])}
			/>
		})}
	</ul>
}

export default OptionDisplayer;