import React, { useEffect, useRef, useState } from "react"
import {Button} from "src/components/Library";
import { useForm } from "react-hook-form";

import Image from "next/future/image"

import { gsap } from "gsap"
import { AuthMode } from "src/contexts/AuthContext";

import googleIcon from "public/images/google.png"

interface Props {
	toggle: (mode: AuthMode) => void
	sendAuthPayload: (payload: { mode: "register" | "login", data: LoginData }) => Promise<void>
	error: any
	modal: { mode: AuthMode, open: boolean }
	signWithGoogle: () => Promise<void>
	setError: (error: any) => void
}

const LoginModal: React.FC<Props> = ({ modal, signWithGoogle, toggle, sendAuthPayload, error, setError: setErrorProvider }) => {

	const [registerMode, setRegisterMode] = useState(modal.mode === "login" ? false : true)

	const { register, handleSubmit, formState: { errors }, setError, watch } = useForm<LoginData>();
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const subscribe = watch(() => setErrorProvider(null))
		const tl = gsap.timeline()
		tl.to(modalRef.current, {
			duration: 0.5,
			opacity: 1,
			backgroundColor: "rgba(0, 0, 0, 0.801)",
			animation: "ease-in"
		})
		tl.play()
		return () => subscribe.unsubscribe()
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
		if (error) return error
		return null
	}

	return <div className="login__modal modal" ref={modalRef} onClick={closeModal}>
		<div className="login__container modal__container">
			<form className="login__form" onSubmit={handleSubmit((e) => {
				console.log("submit")
				sendAuthPayload({ mode: registerMode ? "register" : "login", data: e }).then(() => {
					closeModal()
				})
			})} onClick={(e) => e.stopPropagation()}>
				<h1>{registerMode ? "Inscription" : "Connexion"}</h1>

				{getError() ? <p className="error">{getError()}</p> : null}

				<div className="login__form__group my-4">
					<label htmlFor="email">Email</label>
					<input autoComplete="email" id="email" type="email" className="textbox bright" {...register('email', { required: true })} />
				</div>

				{registerMode && <div className="login__form__group my-4">
					<label htmlFor="username">{"Nom d'utilisateur"}</label>
					<input autoComplete="username" id="username" type="text" className="textbox bright" {...register('username', { required: true })} />
				</div>}

				<div className="login__form__group">
					<label htmlFor="password">Mot de passe</label>
					<input id="password" type="password" className="textbox bright" {...register('password', { required: true })} />
				</div>

				<div className="login__form__group contoller">
					<div className="basic__auth">
						{!registerMode && <Button type="submit">Se connecter</Button>}
						<Button variant="secondary" type="submit" onClick={(e) => {
							if (!registerMode) {
								e.preventDefault()
								setRegisterMode(true)
							}
						}}>{"S'inscrire"}</Button>
					</div>
					{!registerMode && <div className="google__auth" onClick={() => {
						signWithGoogle().then(() => closeModal())
					}}>
						<Image src={googleIcon} width={100} height={100} />
						<h4>Se connecter avec Google</h4>
					</div>}
					{!registerMode ? <p>Mot de passe oublié ?</p> : <p onClick={() => setRegisterMode(false)}>Vous avez déjà un compte ?</p>}
				</div>

			</form>
		</div>
	</div>
}

export default LoginModal;