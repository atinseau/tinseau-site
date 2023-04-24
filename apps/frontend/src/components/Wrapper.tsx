import Head from "next/head";
import { useRouter } from "next/router";
import { HiIdentification, HiQrcode, HiScale } from "react-icons/hi";
import { IoCarSportOutline } from "react-icons/io5"

import React, { memo } from "react"
import Footer from "./Footer";
import Header from "./Header";
import useMedia from "src/hooks/useMedia";

interface Props {
	children: React.ReactNode;
	className?: string
	isAccount?: boolean
}


const links = [
	{
		name: "Mes informations",
		mobile_name: "Infos",
		logo: HiIdentification,
		href: "/my-account",
	},
	{
		name: "Mes voitures",
		mobile_name: "Voitures",
		logo: IoCarSportOutline,
		"href": [
			"/my-account/cars",
			"/my-account/cars/new" // nested routes
		],
	},
	{
		name: "Mes commandes",
		mobile_name: "Commandes",
		logo: HiQrcode,
		href: "/my-account/commands",
	},
	{
		name: "Mes décharges de responsabilité",
		mobile_name: "Décharges",
		logo: HiScale,
		href: [
			"/my-account/responsability",
			"/my-account/responsability/new" // nested routes
		],
	}
]

const AccountWrapper: React.FC<{ className: string, children: React.ReactNode }> = ({ className, children }) => {

	const router = useRouter()
	const isMobile = useMedia("(max-width: 780px)")


	const isSelected = (href: string | string[]) => {
		if (typeof href === "string")
			return router.asPath.endsWith(href) ? "selected" : ""
		else if (typeof href === "object" && href instanceof Array) {
			for (const h of href) {
				if (router.asPath.endsWith(h))
					return "selected"
			}
		}
		return ""
	}

	return <div className={"account__container"}>
		<div className="menu__account">
			<ul>
				{links.map((link, index) => <li onClick={() => router.push(typeof link.href === "string" ? link.href : link.href[0])} key={index} className={isSelected(link.href)}>
					{React.createElement(link.logo, {})}
					<a>{isMobile ? link.mobile_name : link.name}</a>
				</li>)}
			</ul>
		</div>
		<div className={"account__component" + (className ? " " + className : "")}>{children}</div>
	</div>
}

const Wrapper: React.FC<Props> = ({ children, className = "", isAccount = false }) => {
	return <>
		<div className="page__wrapper">
			<Header />
			{isAccount ? <AccountWrapper className={className} children={children}/> : children}
			<Footer />
		</div>
	</>
}

export default memo(Wrapper);