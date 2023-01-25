import { XMarkIcon } from "@heroicons/react/24/solid"
import React, { forwardRef } from "react"
import { classNames } from "src/functions/utils"
import { MenuRef, useOverlay } from "./hooks/useOverlay"

interface Props {
	children?: React.ReactNode
	className?: string
}



const MenuWrapper = forwardRef<MenuRef, Props>(({ children, className = "" }, ref) => {

	const { open, overlayRef, menuRef, closeMenu } = useOverlay(ref)

	return <ul className={classNames("menu__wrapper " + className, open && "mobile__open")} ref={menuRef}>
		{open && <div className="menu__mobile__header">
			<button onClick={() => closeMenu()}>
				<XMarkIcon />
			</button>
		</div>}
		{children}
		{open && <div className="menu__mobile__overlay" ref={overlayRef} />}
	</ul>
})

export type {
	MenuRef
}

export default MenuWrapper