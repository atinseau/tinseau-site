import React, { createContext } from "react"
import AuthProvider from "./provider"
export type AuthMode = "register" | "login"

interface IAuthContext {
	toggleLoginModal: (mode: AuthMode) => void
	logout: () => void
	isLoading: boolean
	user: User | null
	token: string | null

	// user actions

	getUserCars: () => Promise<UserCar[]>
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export {
	AuthProvider
}

export default AuthContext;