import Image from "next/future/image";
import useAuthContext from "src/hooks/useAuthContext";

import User from "public/images/user.jpg"
import useDropdown from "src/hooks/useDropdown";
import { useRouter } from "next/router";

import { HiOutlineLogout } from "react-icons/hi"

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
			<Image src={logo} width={80} height={80} onClick={toggle} />
		</div>

		{open && <ul ref={ref}>
			<li onClick={authCtx.logout}>
				<HiOutlineLogout/>
				Déconnexion
			</li>
		</ul>}
	</div>
}

export default AuthMenu;