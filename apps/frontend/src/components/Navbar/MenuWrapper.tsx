import React from "react"

interface Props {
	children?: React.ReactNode
	className?: string
}

const MenuWrapper: React.FC<Props> = ({ children, className = "" }) => {
	return <ul className={"menu__wrapper " + className}>
		{children}
	</ul>
}

export default MenuWrapper