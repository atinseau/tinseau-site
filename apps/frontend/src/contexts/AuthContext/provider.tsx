import React from "react"
import LoginModal from "src/components/Auth/LoginModal";
import AuthContext from ".";

import useUser from "./hooks/useUser";
import useAuthActions from "./hooks/useAuthActions";
import useUserActions from "./hooks/useUserActions";
import useModal from "./hooks/useAuthModal";

interface Props {
	children: React.ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {


	const {
		getUser,
		logout,
		isLoading,
		token,
		user
	} = useUser()

	const { toggleLoginModal, modal } = useModal()

	const {
		sendAuthPayload,
		signWithGoogle,
		setError,
		error
	} = useAuthActions(getUser)

	const { carActions, dechargeActions } = useUserActions(user) 

	return <AuthContext.Provider value={{
		isLoading,
		user,
		token,
		logout,
		toggleLoginModal,
		carActions,
		dechargeActions
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