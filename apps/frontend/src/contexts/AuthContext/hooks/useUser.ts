import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { getEnvConfig } from "src/functions/getConfig"
import { useErrorContext } from "src/hooks"


const useUser = () => {

	const router = useRouter()

	const errorCtx = useErrorContext()
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const token = useMemo(() => {
		return Cookies.get("token") || null
	}, [user])


	const getUser = async () => {
		try {
			const { data } = await axios.get(getEnvConfig().SERVER_API + "/users/me", {
				headers: {
					"Authorization": `Bearer ${Cookies.get("token")}`
				}
			})
			setUser(data)
		} catch (e) {
			Cookies.remove("token")
		}
	}

	const logout = () => {
		if (!Cookies.get('token'))
			return
		axios.get(getEnvConfig().SERVER_API + "/users/logout", {
			headers: {
				"Authorization": `Bearer ${Cookies.get('token')}`
			}
		}).then(() => {
			errorCtx.createError({
				title: "Déconnexion",
				message: "Vous avez été déconnecté",
				type: "success"
			})
			Cookies.remove("token")
			if (router.asPath.includes('/my-account'))
				router.push('/')
			setUser(null)
		})
	}

	useEffect(() => {
		(async () => {
			if (Cookies.get("token") && !user)
				await getUser()
			else if (!Cookies.get("token") && user)
				setUser(null)
			setIsLoading(false)
		})()
	}, [router])


	return {
		getUser,
		logout,
		isLoading,
		user,
		token
	}
}

export default useUser;