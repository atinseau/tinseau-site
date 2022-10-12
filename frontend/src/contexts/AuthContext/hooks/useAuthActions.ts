import axios, { AxiosError } from "axios"
import Cookies from "js-cookie"
import { useState } from "react"
import { getEnvConfig } from "src/functions/getConfig"
import useErrorContext from "src/hooks/useErrorContext"
import useSocket from "src/hooks/useSocket"
import { AuthMode } from ".."


const useAuthActions = (getUser: () => Promise<void>) => {

	const errorCtx = useErrorContext()
	const socket = useSocket()

	const [error, setError] = useState<any>(null)

	const sendAuthPayload = (payload: { mode: AuthMode, data: LoginData }): Promise<void> => {
		return new Promise(async (resolve, reject) => {
			const ENDPOINT = payload.mode === "login" ?
				getEnvConfig().SERVER_API + "/users/login" :
				getEnvConfig().SERVER_API + "/users/register"
			try {
				const { data } = await axios.post(ENDPOINT, payload.data)
				Cookies.set("token", data.token, {
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
				Cookies.set('token', data.token)
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


	return  {
		sendAuthPayload,
		signWithGoogle,
		error,
		setError
	}
}

export default useAuthActions;