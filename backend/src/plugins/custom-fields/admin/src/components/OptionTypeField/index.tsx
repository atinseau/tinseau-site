import React from 'react';

import { Button } from "@strapi/design-system/Button"
import { Select, Option } from "@strapi/design-system/Select"


type Attribute = {
	target: {
		name: string
		value: string
	}
}

interface Props {
	name: string
	value: string
	attribute: any
	intlLabel: {
		id: string,
		defaultMessage: string
	}
	onChange: (value: Attribute) => void
}

const optionTypes = [
	{
		type: "bool",
		label: "Booléen"
	},
	{
		type: "number",
		label: "Nombre"
	}
]

const Field: React.FC<Props> = ({ name, value, attribute, onChange, intlLabel, ...rest }) => {

	const [selectedOptionType, setSelectedOptionType] = React.useState(optionTypes[0])
	const [val, setValue] = React.useState('January');

	return (
		<>
			<Select 
			id="select1" 
			label="Choose your meal" 
			required 
			value={value} 
			onChange={setValue}
			>
				<Option value={'pizza'} startIcon={<div style={{
					height: '6px',
					borderRadius: '50%',
					width: '6px',
					background: 'red'
				}} />}>
					Pizza
				</Option>
				<Option value={'hamburger'}>Hamburger</Option>
				<Option value={'bagel'}>Bagel</Option>
			</Select>

			<Button
				onClick={() => alert('hello')}
			>Hello World</Button>
		</>
	);
}

export default Field;