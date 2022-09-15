import React, { createContext } from "react"

interface IAuthContext {
	toggleLoginModal: () => void
	isAuth: boolean
	isLoading: boolean
	user: User | null
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export default AuthContext;