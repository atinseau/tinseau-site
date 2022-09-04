import { useEffect, useRef, useState } from "react";
import CircuitOptionPicker from "../components/Configurator/OrderSteps/CircuitOptionPicker";
import CircuitPicker from "../components/Configurator/OrderSteps/CircuitPicker";
import ConfigContext from "./ConfigContext";

interface Props {
	children: React.ReactNode;
}

const steps = [
	CircuitPicker,
	CircuitOptionPicker
]

const ConfigProvider: React.FC<Props> = ({ children }) => {

	const [step, setStep] = useState(0)
	const [isSwitching, setIsSwitching] = useState(false)


	const next = () => {
		if (!isSwitching && step + 1 < steps.length)
			setStep(step + 1)
	}
	const prev = () => {
		if (!isSwitching && step - 1 >= 0) 
			setStep(step - 1)
	}

	return <ConfigContext.Provider value={{
		step,
		isSwitching,
		steps,
		setStep,
		setIsSwitching,
		next,
		prev
	}}>
		{children}
	</ConfigContext.Provider>
}

export default ConfigProvider;