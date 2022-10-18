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

	carActions: {
		cars: UserCar[]
		setCars: React.Dispatch<React.SetStateAction<UserCar[]>>
		fetch: () => void
		remove: (id: string) => void
	}
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export {
	AuthProvider
}

export default AuthContext;