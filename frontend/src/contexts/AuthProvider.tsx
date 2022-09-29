import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react"
import LoginModal from "src/components/Auth/LoginModal";
import { getEnvConfig } from "src/functions/getConfig";
import useErrorContext from "src/hooks/useErrorContext";
import useSocket from "src/hooks/useSocket";
import AuthContext, { AuthMode } from "./AuthContext";

import Cookie from "js-cookie"


interface Props {
	children: React.ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {

	const socket = useSocket()
	const router = useRouter()

	const errorCtx = useErrorContext()

	const [modal, setModal] = useState<{ mode: AuthMode, open: boolean }>({ mode: "login", open: false })
	const [error, setError] = useState<any>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		if (modal.open) {
			document.body.style.overflowY = "scroll"
			document.body.style.position = "fixed"
			document.body.style.width = "100%"
		}
		else document.body.removeAttribute("style")
	}, [modal])

	const isAuth = useMemo(() => {
		return !!user
	}, [user])

	const token = useMemo(() => {
		return Cookie.get("token") || null
	}, [user])

	const getUser = async () => {
		try {
			const { data } = await axios.get(getEnvConfig().SERVER_API + "/users/me", {
				headers: {
					"Authorization": `Bearer ${Cookie.get("token")}`
				}
			})
			setUser(data)
			console.log(data)
		} catch (e) {
			Cookie.remove("token")
		}
	}

	useEffect(() => {
		(async () => {

			console.log(Cookie.get('token'))

			if (Cookie.get("token"))
				await getUser()
			setIsLoading(false)
		})()
	}, [])

	const toggleLoginModal = (mode: AuthMode) => setModal({ mode, open: !modal.open })

	const sendAuthPayload = (payload: { mode: AuthMode, data: LoginData }): Promise<void> => {
		return new Promise(async (resolve, reject) => {
			const ENDPOINT = payload.mode === "login" ?
				getEnvConfig().SERVER_API + "/users/login" :
				getEnvConfig().SERVER_API + "/users/register"
			try {
				const { data } = await axios.post(ENDPOINT, payload.data)
				Cookie.set("token", data.token, {
					path: "/",
					expires: new Date(data.expires_at)
				})
				await getUser()

				errorCtx.createError({
					title: payload.mode === "login" ? "Connexion réussie" : "Inscription réussie",
					message: payload.mode === "login" ? "Vous êtes maintenant connecté" : "Votre compte a bien été créé",
					type: "success"
				})

				resolve()
			} catch (e) {
				const axiosError = e as AxiosError<{ message: string }>
				setError(axiosError.response?.data.message || "Une erreur est survenue")
				reject()
			}
		})
	}

	const signWithGoogle = (): Promise<void> => {
		return new Promise(async (resolve) => {
			const { data } = await axios.get(getEnvConfig().SERVER_API + "/users/google")
			const popup = window.open(data.url, "popup", "width=600,height=600")
			socket?.on('google:auth', async (data) => {
				Cookie.set('token', data.token)
				await getUser()
				popup?.close()
				resolve()
			})

			const timer = setInterval(() => {
				if (popup?.closed) {
					clearInterval(timer)
					socket?.removeListener('google:auth')
				}
			}, 500)
		})
	}

	const logout = () => {
		if (!Cookie.get('token'))
			return
		axios.get(getEnvConfig().SERVER_API + "/users/logout", {
			headers: {
				"Authorization": `Bearer ${Cookie.get('token')}`
			}
		}).then(() => {
			errorCtx.createError({
				title: "Déconnexion",
				message: "Vous avez été déconnecté",
				type: "success"
			})
			Cookie.remove("token")
			if (router.asPath.includes('/my-account'))
				router.push('/')
			setUser(null)
		})
	}

	return <AuthContext.Provider value={{
		isLoading,
		isAuth,
		user,
		token,
		logout,
		toggleLoginModal
	}}>
		{children}
		{modal.open && <LoginModal
			signWithGoogle={signWithGoogle}
			modal={modal}
			toggle={toggleLoginModal}
			sendAuthPayload={sendAuthPayload}
			error={error}
			setError={setError}
		/>}
	</AuthContext.Provider>
}

export default AuthProvider;