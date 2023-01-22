import React from "react";

interface Props {
	children: React.ReactNode
	className?: string
	type?: "button" | "submit" | "reset"
	variant?: "primary" | "secondary" | "disabled" | "danger"
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button: React.FC<Props> = ({ children, onClick, className = "", type = "button", variant = "primary"}) => {

	const getVariant = () => {
		switch (variant) {
			case "primary":
				return "btn-primary"
			case "secondary":
				return "btn-secondary"
			case "disabled":
				return "btn-disabled"
			case "danger":
				return "btn-danger"
		}
	}

	return (<button className={"btn" + " " + getVariant() + (className ? " " + className: "")} onClick={onClick} type={type}>
		{children}
	</button>)
}

export default Button;