import React, { useEffect, useMemo, useState } from "react"
import LoginModal from "src/components/Auth/LoginModal";
import AuthContext from "./AuthContext";


interface Props {
	children: React.ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {

	const [loginModal, setLoginModal] = useState(false)
	const [error, setError] = useState<any>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		if (loginModal) document.body.style.overflow = "hidden"
		else document.body.removeAttribute("style")
	}, [loginModal])

	const isAuth = useMemo(() => {
		return !!user
	}, [user])

	useEffect(() => {
		(async () => {
			if (localStorage.getItem("token")) {
				// const res = await client.query({
				// 	query: ME_QUERY,
				// 	errorPolicy: "all"
				// })
				// if (res.errors) localStorage.removeItem("token")
				// else setUser(res.data.me)
			}
			setIsLoading(false)
		})()
	}, [])

	const toggleLoginModal = () => setLoginModal(!loginModal)

	const sendAuthPayload = async (payload: { mode: "register" | "login", data: LoginData }) => {
		// const res = await client.mutate({
		// 	mutation: payload.mode === "register" ? REGISTER_QUERY : LOGIN_QUERY,
		// 	errorPolicy: "all",
		// 	variables: payload.data
		// })
		// if (res.errors) {
		// 	setError(res.errors)
		// 	return
		// }
		// setError(null)

		// window.localStorage.setItem("token", res.data[payload.mode].jwt)
		// setUser(res.data[payload.mode].user)
	}

	return <AuthContext.Provider value={{
		isLoading,
		isAuth,
		user,
		toggleLoginModal
	}}>
		{children}
		{loginModal && <LoginModal toggle={toggleLoginModal} sendAuthPayload={sendAuthPayload} error={error} />}
	</AuthContext.Provider>
}

export default AuthProvider;