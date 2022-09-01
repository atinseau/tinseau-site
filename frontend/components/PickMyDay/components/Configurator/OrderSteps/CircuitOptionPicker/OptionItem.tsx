import React from "react"
import Incrementer from "../../../../../Library/Incrementer";

interface Props {
	option: {
		label: string,
		value: number,
		key: string,
		price: number,
		desc: string,
	},
	min?: number,
	max?: number,
	changeOption: (key: string, value: number) => void
}

const OptionItem: React.FC<Props> = ({ option, changeOption, min = 0 , max }) => {
	return <li>
		<div>
			<h4>{option.label} <span>{option.price}€</span></h4>
			<Incrementer min={min} max={max} setCount={(e) => {
				changeOption(option.key, e)
			}} count={option.value} />
		</div>
		<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas distinctio exercitationem veritatis voluptas incidunt eligendi rerum molestiae quasi numquam nobis sit.</p>
	</li>
}

export default OptionItem;