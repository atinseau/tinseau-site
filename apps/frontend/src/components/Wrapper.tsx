import Head from "next/head";
import { useRouter } from "next/router";
import { HiIdentification, HiQrcode, HiScale } from "react-icons/hi";
import { IoCarSportOutline } from "react-icons/io5"

import React from "react"
import Footer from "./Footer";
import Header from "./Header";

interface Props {
	children: React.ReactNode;
	title: string
	className?: string
	isAccount?: boolean
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

const AccountWrapper: React.FC<{ className: string, children: React.ReactNode }> = ({ className, children }) => {

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
		return ""
	}

	return <div className={"account__container"}>
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
}

const Wrapper: React.FC<Props> = ({ children, className = "", title, isAccount = false }) => {
	return <>
		<Head>
			<title>{title}</title>
		</Head>
		<div className="page__wrapper">
			<Header />
			{isAccount ? <AccountWrapper className={className} children={children}/> : children}
			<Footer />
		</div>
	</>
}

export default Wrapper;