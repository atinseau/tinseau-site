import { XMarkIcon } from "@heroicons/react/24/solid"
import React from "react"
import { classNames } from "src/functions/utils"
import { useOverlay } from "./hooks/useOverlay"

interface Props {
	children?: React.ReactNode
	className?: string
	isOpen?: boolean
	setIsOpen?: (isOpen: boolean) => void
}

const MainMenuWrapper: React.FC<Props> = ({ children, className, isOpen, setIsOpen }) => {
	
	const { overlayRef, menuRef, closeMenu } = useOverlay(isOpen!, setIsOpen!)

	return <ul className={classNames("menu__wrapper", className, isOpen && "mobile__open")} ref={menuRef}>
		{isOpen && <div className="menu__mobile__header">
			<button onClick={() => closeMenu()}>
				<XMarkIcon />
			</button>
		</div>}
		{children}
		{isOpen && <>
			<div className="menu__mobile__login">

			</div>
			<div className="menu__mobile__overlay" ref={overlayRef} />
		</>}
	</ul>
}

const MenuWrapper: React.FC<Props & { isMainMenu?: boolean }> = ({ isMainMenu = false, ...rest }) => {
	return isMainMenu 
		? <MainMenuWrapper {...rest}/>
		:  <ul className={classNames("menu__wrapper ", rest.className, "mobile__open")}>
			{rest.children}
		</ul>
}

export default MenuWrapper