import Image from "next/image";
import React, { memo } from "react";
import MenuItem from "./MenuItem";
import MenuWrapper from "./MenuWrapper";

import logo from "public/images/logo.png"
import MenuItemWithSub from "./MenuItemWithSub";
import { Link } from "src/components/Library";

import { GiHamburgerMenu } from "react-icons/gi";
import LoginMenu from "./LoginMenu";

const Navbar: React.FC = () => {

	const [isOpen, setIsOpen] = React.useState(false)

	return <nav className="nav__bar">
		<Link className="home__link" href={"/"}>
			<Image src={logo} alt="logo" />
			tinseau.com
		</Link>

		<MenuWrapper isOpen={isOpen} setIsOpen={setIsOpen} isMainMenu={true} className="main__menu">
			{isOpen && <MenuItem href="/" title="Accueil" />}
			<MenuItem href="/pick-my-day" title="Choisir ma journée" />
			<MenuItemWithSub subPath="/product" title="Product">
				<MenuWrapper>
					<MenuItem href="/product/1" title="Product 1" />
					<MenuItem href="/product/2" title="Product test 2" />
					<MenuItem href="/product/3" title="Product bonsoir" />
					<MenuItem href="/product/3" title="Product ok" />
				</MenuWrapper>
			</MenuItemWithSub>
			<MenuItem href="/community" title="Community" />
			<MenuItem href="/contact-us" title="Contact us" />
			<MenuItem href="/about" title="About" />
		</MenuWrapper>

		<LoginMenu />

		<section className="menu__burger">
			<button onClick={() => setIsOpen(!isOpen)}>
				<GiHamburgerMenu />
			</button>
		</section>
	</nav>
}

export default memo(Navbar);