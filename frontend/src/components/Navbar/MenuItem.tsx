import React from "react"
import Link from "../Library/Link"
import { useRouter } from "next/router"

interface Props {
	title: string
	href: string
}

const MenuItem: React.FC<Props> = ({ href, title }) => {

	const router = useRouter()

	return <li className={"menu__item " + (href == router.pathname ? "active": "")}>
		<Link href={href}>{title}</Link>
	</li>
}


export default MenuItem