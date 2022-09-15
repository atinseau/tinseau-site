import React from "react"
import Link from "../Library/Link"
import { useRouter } from "next/router"

interface Props {
	title: string
	href?: string
	onClick?: () => void
}

const MenuItem: React.FC<Props> = ({ href, title, onClick }) => {

	const router = useRouter()

	return <li className={"menu__item " + (href == router.pathname ? "active": "")}>
		{onClick ? <a onClick={onClick}>{title}</a> : <Link href={href || "/"}>{title}</Link> } 
	</li>
}


export default MenuItem