import React from "react";

interface Props {
	children: React.ReactNode
	className?: string
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button: React.FC<Props> = ({ children, onClick, className = ""}) => {
	return (<button className={"btn btn-primary " + className} onClick={onClick}>
		{children}
	</button>)
}

export default Button;