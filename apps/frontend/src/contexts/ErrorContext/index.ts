import React from "react"

export interface IError {
	title: string
	message: string
	type: "danger" | "warning" | "success" | "info"
}


interface IErrorContext {
	createError: (error: IError) => void
	regularError: () => void 
}

const ErrorContext = React.createContext<IErrorContext>({} as IErrorContext)

export { default as ErrorProvider } from './provider'

export default ErrorContext