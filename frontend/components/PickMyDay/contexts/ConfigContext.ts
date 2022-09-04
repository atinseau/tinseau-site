import React from "react"

interface IConfigContext {
	step: number
	setStep: (step: number) => void

	isSwitching: boolean
	setIsSwitching: (isSwitching: boolean) => void

	steps: React.FC<any>[]
	next: () => void
	prev: () => void
}

const ConfigContext = React.createContext<IConfigContext>({} as IConfigContext)

export default ConfigContext;