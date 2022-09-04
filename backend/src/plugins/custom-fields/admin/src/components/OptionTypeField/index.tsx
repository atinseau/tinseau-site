import React from 'react';

import { Button } from "@strapi/design-system/Button"
import { SimpleMenu, MenuItem } from '@strapi/design-system/SimpleMenu';
import { ChevronDownIcon } from "@heroicons/react/24/outline"


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
			<SimpleMenu id="label" label={val}>
				<MenuItem id="menuItem-January" onClick={() => setValue('January')}>
					January
				</MenuItem>
				<MenuItem id="menuItem-February" onClick={() => setValue('February')}>
					February
				</MenuItem>
			</SimpleMenu>

			<Button
				onClick={() => alert('hello')}
			>Hello World</Button>
		</>
	);
}

export default Field;