import React from "react"

interface Props {
	type: "text" | "email" | "password"
	placeholder: string
	name: string
	id: string
	variant?: "dark" | "light"
	onChange?: (value: string) => void
	value?: string
}

const Input: React.FC<Props> = ({ variant = "light", name, id, type, placeholder, value, onChange }) => {
	return (<input 
		type={type} 
		className={`textbox ${variant}`}
		name={name}
		id={id}
		placeholder={placeholder}
		value={value}
		onChange={(event) => onChange && onChange(event.target.value)}
	/>)
}

export default Input;