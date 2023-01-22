import Image from "next/image";
import React from "react";
import MenuItem from "./MenuItem";
import MenuWrapper from "./MenuWrapper";

import logo from "public/images/logo.png"
import MenuItemWithSub from "./MenuItemWithSub";
import { useAuthContext } from "src/hooks";
import AuthMenu from "./AuthMenu";
import { Link } from "src/components/Library";

const Navbar: React.FC = () => {

	const authCtx = useAuthContext()

	return <nav className="nav__bar">
		<Link className="home__link" href={"/"}>
			<Image src={logo} alt="logo" />
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
			<MenuItem href="/community" title="Community" />
			<MenuItem href="/contact-us" title="Contact us" />
			<MenuItem href="/about" title="About" />
		</MenuWrapper>

		{!authCtx.isLoading ? <>
			{!authCtx.user ? <MenuWrapper className="right__menu">
				<MenuItem onClick={() => authCtx.toggleLoginModal("login")} title="Login" />
				<MenuItem onClick={() => authCtx.toggleLoginModal("register")} title="Register" />
			</MenuWrapper> : <AuthMenu />}
		</> : null}
	</nav>
}

export default Navbar;