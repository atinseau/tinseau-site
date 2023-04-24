'use client';

import Image from "next/image";
import { useAuthContext, useDropdown } from "src/hooks";

import User from "public/images/user.jpg"
import { useRouter } from "next/navigation";

import { HiOutlineLogout } from "react-icons/hi"
import { memo } from "react";

const AuthMenu = () => {

	const authCtx = useAuthContext()
	const router = useRouter()
	const [open, toggle, ref] = useDropdown<HTMLUListElement>()

	if (!authCtx.user)
		return null

	const logo = authCtx.user.profil ? authCtx.user.profil.url : User

	return <div className="auth__menu">
		<div>
			<h5 onClick={() => router.push('/my-account')}>Mon compte</h5>
			<Image alt={""} src={logo} width={80} height={80} onClick={toggle} />
		</div>

		{open && <ul ref={ref}>
			<li onClick={authCtx.logout}>
				<HiOutlineLogout />
				Déconnexion
			</li>
		</ul>}
	</div>
}

export default memo(AuthMenu);