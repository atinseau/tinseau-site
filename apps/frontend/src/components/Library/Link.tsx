
import { useRouter } from "next/router"
import React from "react"

interface Props {
	className?: string
	href?: string
	children: React.ReactNode
}

const Link: React.FC<Props> = ({ children, href, className }) => {
	const router = useRouter()

	return <a 
		className={className}
		href={href}
		onClick={(e) => {
			e.preventDefault()
			if (href)
				router.push(href)
		}}
	>
		{children}
	</a>
}

export default Link