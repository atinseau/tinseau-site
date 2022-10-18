import AccountWrapper from "src/components/MyAccount/AccountWrapper";
import useAuthContext from "src/hooks/useAuthContext";

import User from "public/images/user.jpg"
import { useMemo } from "react";
import { Input, Button } from "src/components/Library";
import Image from "next/future/image";
import { CheckIcon } from "@heroicons/react/24/solid";

const MyAccount = () => {

	const authCtx = useAuthContext()

	const logo = useMemo(() => {
		if (!authCtx.user || !authCtx.user.profil)
			return User
		return authCtx.user.profil.url
	}, [authCtx.user])

	return <AccountWrapper title="Mes informations" className="informations">

		<div className="global">
			<h3>Vos informations</h3>
			<div className="group">
				<div>
					<h4>Nom d'utilisateur</h4>
					<Input />
				</div>

				<div>
					<h4>Date de naissance</h4>
					<Input />
				</div>
			</div>
		</div>

		<div className="address">
			<h3>Votre adresse</h3>
			<div className="group">
				<div>
					<h4>Ville</h4>
					<Input />
				</div>

				<div>
					<h4>Adresse</h4>
					<Input />
				</div>

				<div>
					<h4>Code postal</h4>
					<Input />
				</div>

			</div>
		</div>

		<div className="logo">
			<h3>Logo</h3>
			<div>
				<Image src={logo} width={200} height={200} />
				<Button variant="secondary">Modifier</Button>
			</div>
		</div>


		<div className="controller">
			<Button>
				Mettre à jour
				<CheckIcon />
			</Button>
		</div>

	</AccountWrapper>
}


// export const getServerSideProps: GetServerSideProps = async (ctx) => {
// 	const { token } = ctx.req.cookies

// 	if (!token) {
// 		return {
// 			redirect: {
// 				destination: '/',
// 				permanent: false
// 			}
// 		}
// 	}

// 	return {
// 		props: {}
// 	}
// }

export default MyAccount;