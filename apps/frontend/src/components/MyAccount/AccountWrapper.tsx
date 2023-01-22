import { HiIdentification, HiQrcode, HiScale } from "react-icons/hi";
import { IoCarSportOutline } from "react-icons/io5"

import Link from "next/link";
import { useRouter } from "next/router";
import Wrapper from "src/components/Wrapper";

import React from "react"

interface Props {
	children: React.ReactNode
	title: string
	className?: string
}

const links = [
	{
		name: "Mes informations",
		logo: HiIdentification,
		href: "/my-account",
	},
	{
		name: "Mes voitures",
		logo: IoCarSportOutline,
		"href": [
			"/my-account/cars",
			"/my-account/cars/new" // nested routes
		],
	},
	{
		name: "Mes commandes",
		logo: HiQrcode,
		href: "/my-account/commands",
	},
	{
		name: "Mes décharges de responsabilité",
		logo: HiScale,
		href: [
			"/my-account/responsability",
			"/my-account/responsability/new" // nested routes
		],
	}
]

const AccountWrapper: React.FC<Props> = ({ children, title, className }) => {

	const router = useRouter()

	const isSelected = (href: string | string[]) => {
		if (typeof href === "string")
			return router.asPath.endsWith(href) ? "selected" : ""
		else if (typeof href === "object" && href instanceof Array) {
			for (const h of href) {
				if (router.asPath.endsWith(h))
					return "selected"
			}
		}
		return  ""
	}

	return <Wrapper title={title}>
		<div className={"account__container"}>
			<div className="menu__account">
				<ul>
					{links.map((link, index) => <li onClick={() => router.push(typeof link.href === "string" ? link.href : link.href[0])} key={index} className={isSelected(link.href)}>
						{React.createElement(link.logo, {})}
						<a>{link.name}</a>
					</li>)}
				</ul>
			</div>
			<div className={"account__component" + (className ? " " + className : "")}>{children}</div>
		</div>
	</Wrapper>
}

export default AccountWrapper;