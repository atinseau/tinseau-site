import Image from "next/image";
import React, { useEffect, useRef } from "react";
import MenuItem from "./MenuItem";
import MenuWrapper, { MenuRef } from "./MenuWrapper";

import logo from "public/images/logo.png"
import MenuItemWithSub from "./MenuItemWithSub";
import { useAuthContext } from "src/hooks";
import AuthMenu from "./AuthMenu";
import { Button, Link } from "src/components/Library";

import { GiHamburgerMenu } from "react-icons/gi";

const Navbar: React.FC = () => {

	const authCtx = useAuthContext()
	const menuRef = useRef<MenuRef>(null)

	useEffect(() => {
		console.log(menuRef.current)
	}, [])

	return <nav className="nav__bar">
		<Link className="home__link" href={"/"}>
			<Image src={logo} alt="logo" />
			tinseau.com
		</Link>

		<MenuWrapper ref={menuRef} className="main__menu">
			{menuRef.current?.open && <Button onClick={() => menuRef.current?.toggle()}>Accueil</Button>}
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

			<section className="right__menu">
				{!authCtx.user ? <MenuWrapper className="login__menu">
					<MenuItem onClick={() => authCtx.toggleLoginModal("login")} title="Login" />
					<MenuItem onClick={() => authCtx.toggleLoginModal("register")} title="Register" />
				</MenuWrapper> : <AuthMenu />}
			</section>

			<section className="menu__burger">
				<button onClick={() => menuRef.current?.toggle()}>
					<GiHamburgerMenu />
				</button>
			</section>

		</> : null}
	</nav>
}

export default Navbar;