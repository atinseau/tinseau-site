import React, { forwardRef } from "react"

interface Props {
	type?: "text" | "email" | "password"
	placeholder: string
	name: string
	id?: string
	variant?: "dark" | "light"
	onChange?: any
	value?: string

	[key: string]: any
}

const Input = forwardRef<HTMLInputElement, Props>(({ variant = "light", name, id, type = "text", placeholder, value, onChange, ...rest }, ref) => {
	return (<input
		type={type}
		ref={ref}
		className={`textbox ${variant}`}
		name={name}
		id={id}
		placeholder={placeholder}
		value={value}
		onChange={onChange}
		{...rest}
	/>)
})

export default Input;