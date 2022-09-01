import Image from "next/future/image";
import React from "react";
import Button from "../Library/Button";
import Link from "../Library/Link";
import MenuItem from "./MenuItem";
import MenuWrapper from "./MenuWrapper";

import logo from "../../public/images/logo.png"
import MenuItemWithSub from "./MenuItemWithSub";

const Navbar: React.FC = () => {
	return <nav className="nav__bar">
		<Link className="home__link" href={"/"}>
			<Image src={logo}/>
			tinseau.com
		</Link>
		
		<MenuWrapper>
			<MenuItem href="/pick-my-day" title="Choisir ma journée" />
			<MenuItemWithSub href="/product" title="Product">
				<MenuWrapper>
					<MenuItem href="/product/1" title="Product 1" />
					<MenuItem href="/product/2" title="Product test 2" />
					<MenuItem href="/product/3" title="Product bonsoir" />
					<MenuItem href="/product/3" title="Product ok" />
				</MenuWrapper>
			</MenuItemWithSub>
			<MenuItem href="/community" title="Community"/>
			<MenuItem href="/contact-us" title="Contact us" />
			<MenuItem href="/about" title="About" />
		</MenuWrapper>

		<MenuWrapper className="right__menu">
			<MenuItem href="/login" title="Login" />
			<MenuItem href="/register" title="Register" />
		</MenuWrapper>
	</nav>
}

export default Navbar;