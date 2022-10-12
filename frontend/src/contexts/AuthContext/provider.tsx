import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react"
import LoginModal from "src/components/Auth/LoginModal";
import { getEnvConfig } from "src/functions/getConfig";
import useErrorContext from "src/hooks/useErrorContext";
import useSocket from "src/hooks/useSocket";
import AuthContext, { AuthMode } from ".";

import Cookie from "js-cookie"
import useUser from "./hooks/useUser";
import useModal from "./hooks/useModal";
import useAuthActions from "./hooks/useAuthActions";
import useUserActions from "./hooks/useUserActions";


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

	const { getUserCars } = useUserActions(user) 

	return <AuthContext.Provider value={{
		isLoading,
		user,
		token,
		logout,
		toggleLoginModal,
		getUserCars
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