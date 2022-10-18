import React from "react"
import { Link } from "src/components/Library"

import { HiChevronDown } from "react-icons/hi"
import { useRouter } from "next/router"
import useDropdown from "../../hooks/useDropdown"

interface Props {
	children: React.ReactNode
	title: string
	href: string
}

const MenuItemWithSub: React.FC<Props> = ({ children, href, title }) => {

	const [isOpen, toggle, ref] = useDropdown()
	const router = useRouter()

	return router.pathname != href ? <li className={"menu__item sub__menu " + (href == router.pathname ? "active" : "")}>
		<Link href={href}>{title}</Link>
		<>
			<HiChevronDown onClick={toggle} />
			{isOpen && <div ref={ref}>
				{children}
			</div>}
		</>
	</li> : null
}


export default MenuItemWithSub