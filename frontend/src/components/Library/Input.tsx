import React from "react"

interface Props {
	type: "text" | "email" | "password"
	placeholder: string
	name: string
	id: string
	onChange?: (value: string) => void
	value?: string
}

const Input: React.FC<Props> = ({ name, id, type, placeholder, value, onChange }) => {
	return (<input 
		type={type} 
		className="textbox"
		name={name}
		id={id}
		placeholder={placeholder}
		value={value}
		onChange={(event) => onChange && onChange(event.target.value)}
	/>)
}

export default Input;