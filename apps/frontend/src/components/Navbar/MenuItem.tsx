'use client';

import React, { memo } from "react"
import { Link } from "src/components/Library"
import { useRouter } from "next/navigation"

interface Props {
	title: string
	href?: string
	onClick?: () => void
}

const MenuItem: React.FC<Props> = ({ href, title, onClick }) => {

	const router = useRouter()

	return <li onClick={() => onClick ? onClick() : router.push(href || "/")} className={"menu__item " + (href == router.pathname ? "active" : "")}>
		<Link>{title}</Link>
	</li>
}


export default memo(MenuItem)