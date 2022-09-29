import React, { createContext } from "react"

export type AuthMode = "register" | "login"

interface IAuthContext {
	toggleLoginModal: (mode: AuthMode) => void
	logout: () => void
	isAuth: boolean
	isLoading: boolean
	user: User | null
	token: string | null
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export default AuthContext;