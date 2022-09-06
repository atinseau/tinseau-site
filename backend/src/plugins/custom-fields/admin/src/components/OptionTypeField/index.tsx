import React from 'react';

import { Select, Option } from "@strapi/design-system/Select"
import { Typography } from "@strapi/design-system/Typography"
import { NumberInput } from '@strapi/design-system/NumberInput';
import { ToggleInput } from '@strapi/design-system/ToggleInput';
import { Box } from '@strapi/design-system/Box';

type Attribute = {
	target: {
		name: string
		value: string
	}
}

type i18nMessage = {
	id: string
	defaultMessage: string
}

interface Props {
	name: string
	value: string
	attribute: any
	description: i18nMessage
	intlLabel: i18nMessage
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

const Field: React.FC<Props> = ({ name, value, attribute, description, onChange, intlLabel, ...rest }) => {

	const [type, setType] = React.useState(null)
	const [boolValue, setBoolValue] = React.useState(false)
	const [numberValue, setNumberValue] = React.useState(0)

	const [jsonValue, setJsonValue] = React.useState<{ type: string, value: any } | null>(null)

	const getType = (t) => optionTypes.find((option) => option.type === t)

	React.useEffect(() => {

		if (!value)
			return

		const json = JSON.parse(value)
		const t = json?.type || null

		setType(t)
		if (t && t === "number") setNumberValue(json.value || 0)
		else if (t && t === "bool") setBoolValue(json.value || false)
	}, [])

	React.useEffect(() => {
		if (type) setJsonValue({ type, value: type === "bool" ? boolValue : numberValue })
	}, [type])

	React.useEffect(() => {
		if (type) setJsonValue({ type, value: type === "bool" ? boolValue : numberValue })
	}, [boolValue, numberValue])

	React.useEffect(() => {
		const output = JSON.stringify(jsonValue)
		onChange({
			target: {
				name,
				value: output
			}
		})
	}, [jsonValue])

	return (
		<>
			<Select
				id="option"
				required
				hint={description?.defaultMessage || ""}
				label={intlLabel.defaultMessage}
				value={type}
				onChange={setType}
			>
				{optionTypes.map((optionType, i) => <Option key={i} value={optionType.type}>
					{optionType.label}
				</Option>)}
			</Select>

			{type && <Box marginTop={"10px"}>
				<div style={{marginBottom: 5}}>
					<Typography variant="pi" fontWeight="bold">Choisissez la valeur par défaut de l'option</Typography>
				</div>

				{type === "bool" && <ToggleInput onLabel={"Oui"} offLabel={"Non"} checked={boolValue} onChange={(e) => setBoolValue(e.target.checked)} />}
				{type === "number" && <NumberInput name="input" value={numberValue} onValueChange={setNumberValue} />}
			</Box>}
		</>
	);
}

export default Field;