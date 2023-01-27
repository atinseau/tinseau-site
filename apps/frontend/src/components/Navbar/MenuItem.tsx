import React from "react"
import { Link } from "src/components/Library"
import { useRouter } from "next/router"

interface Props {
	title: string
	href?: string
	onClick?: () => void
}

const MenuItem: React.FC<Props> = ({ href, title, onClick }) => {

	const router = useRouter()

	return <li onClick={() => onClick ? onClick() : router.push(href || "/")} className={"menu__item " + (href == router.pathname ? "active" : "")}>
		<Link href={href}>{title}</Link>
	</li>
}


export default MenuItem