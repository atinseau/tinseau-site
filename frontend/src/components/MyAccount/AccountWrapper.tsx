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
		"href": "/my-account/cars",
	},
	{
		name: "Mes commandes",
		logo: HiQrcode,
		href: "/my-account/commands",
	}, 
	{
		name: "Mes décharges de responsabilité",
		logo: HiScale,
		href: "/my-account/responsability",
	}
]

const AccountWrapper: React.FC<Props> = ({ children, title, className }) => {

	const router = useRouter()

	return <Wrapper title={title}>
		<div className={"account__container"}>
			<div className="menu__account">
				<ul>
					{links.map((link, index) => <li onClick={() => router.push(link.href)} key={index} className={router.asPath.split('?')[0] === link.href ? "selected": ""}>
						{React.createElement(link.logo, {})}
						<a>{link.name}</a>
					</li>)}					
				</ul>
			</div>
			<div className={"account__component" + (className ? " " + className: "")}>{children}</div>
		</div>

	</Wrapper>
}

export default AccountWrapper;