import React from "react"

interface Props {
	dbOptions: TTDOption[]
	options: OrderOption[]
	order: OrderSubItem
}

const OptionResumeRender: React.FC<Props> = ({ dbOptions, options, order }) => {
	return <>
		{dbOptions.map((option, i) => {
			const optionSelected = options.find(o => o.name === option.name)
			const coef = order.type === "location" ? order.locations?.length || 1 : order.classic?.count || 1

			if (!optionSelected)
				return null

			if (optionSelected.type === "number" && optionSelected.value === 0) {
				if (optionSelected.value + (option.settings.value * coef) === 0)
					return null
			}

			if (optionSelected.type === "bool" && !optionSelected.value)
				return null

			return <li key={i}>
				<p>
					<span className="mr-1">{option.name}</span>
					{optionSelected.type === "number" && <span className="text-white">
						(x{optionSelected.value + (option.settings.value * coef)})
					</span>}
				</p>
				<p>{
					optionSelected.type === "number" ?
						optionSelected.value * option.price :
						optionSelected.type === "bool" ? option.price : 0
				}€</p>
			</li>
		})}
	</>
}

export default OptionResumeRender