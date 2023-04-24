import React, { memo } from "react"
import { Link } from "src/components/Library"

import { HiChevronDown } from "react-icons/hi"
import { useRouter } from "next/router"
import { useDropdown } from "src/hooks"

interface Props {
	children: React.ReactNode
	title: string
	subPath: string
}

const MenuItemWithSub: React.FC<Props> = ({ children, subPath, title }) => {

	const [isOpen, toggle, ref] = useDropdown()
	const router = useRouter()

	return router.pathname != subPath ? <li className={"menu__item sub__menu " + (router.pathname.includes(subPath) ? "active" : "")}>
		<button onClick={toggle}>
			{title}
			<HiChevronDown />
		</button>
		{isOpen && <div ref={ref}>
			{children}
		</div>}
	</li> : null
}


export default memo(MenuItemWithSub)