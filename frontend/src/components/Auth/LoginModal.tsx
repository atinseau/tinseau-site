import React, { useEffect, useRef, useState } from "react"
import Button from "src/components/Library/Button";
import { useForm } from "react-hook-form";

import gsap from "gsap"

interface Props {
	toggle: () => void
	sendAuthPayload: (payload: { mode: "register" | "login", data: LoginData }) => void
	error: any 
}

const LoginModal: React.FC<Props> = ({ toggle, sendAuthPayload, error }) => {

	const [registerMode, setRegisterMode] = useState(false)

	const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginData>();
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const tl = gsap.timeline()
		tl.to(modalRef.current, {
			duration: 0.5,
			opacity: 1,
			backgroundColor: "rgba(0, 0, 0, 0.801)",
			animation: "ease-in"
		})
		tl.play()
	}, [])

	const closeModal = () => {
		gsap.to(modalRef.current, {
			duration: 0.5,
			opacity: 0,
			backgroundColor: "rgba(0, 0, 0, 0)",
			animation: "ease-out",
			onComplete: toggle
		})
	}

	const getError = () => {
		if (errors.username && registerMode) return "Le nom d'utilisateur est requis"
		if (errors.email) return "L'email est requis"
		if (errors.password) return "Le mot de passe est requis"
		if (error) {
			if (registerMode) return "L'utilisateur existe déjà ou l'email est déjà utilisé"
			else return "L'email ou le mot de passe est incorrect"
		}
		return null
	}

	return <div className="login__modal" ref={modalRef} onClick={closeModal}>
		<div className="login__container">
			<form className="login__form" onSubmit={handleSubmit((e) => sendAuthPayload({mode: registerMode ? "register": "login", data: e}))} onClick={(e) => e.stopPropagation()}>
				<h1>Connexion</h1>

				{getError() ? <p className="error">{getError()}</p> : null}

				{registerMode && <div className="login__form__group my-4">
					<label htmlFor="username">{"Nom d'utilisateur"}</label>
					<input id="username" type="text" className="textbox" {...register('username', { required: true })} />
				</div>}

				<div className="login__form__group my-4">
					<label htmlFor="email">Email</label>
					<input id="email" type="email" className="textbox" {...register('email', { required: true })} />
				</div>

				<div className="login__form__group">
					<label htmlFor="password">Mot de passe</label>
					<input id="password" type="password" className="textbox" {...register('password', { required: true })} />
				</div>

				<div className="login__form__group contoller">
					<div>
						{!registerMode && <Button type="submit">Se connecter</Button>}
						<Button variant="secondary" type="submit" onClick={() => !registerMode && setRegisterMode(true)}>{"S'inscrire"}</Button>
					</div>
					{!registerMode ? <p>Mot de passe oublié ?</p> : <p onClick={() => setRegisterMode(false)}>Vous avez déjà un compte ?</p>}
				</div>

			</form>
		</div>
	</div>
}

export default LoginModal;