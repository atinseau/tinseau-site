import { useMemo, useState } from "react";
import CarPicker from "../components/Configurator/OrderSteps/CarPicker";
import CircuitOptionPicker from "../components/Configurator/OrderSteps/CircuitOptionPicker";
import CircuitPicker from "../components/Configurator/OrderSteps/CircuitPicker";
import useOrderContext from "../hooks/useOrderContext";
import ConfigContext from "./ConfigContext";

interface Props {
	children: React.ReactNode;
}


const ConfigProvider: React.FC<Props> = ({ children }) => {

	const ctx = useOrderContext()

	const [step, setStep] = useState(0)
	const [isSwitching, setIsSwitching] = useState(false)

	const steps = useMemo(() => ctx.orderType === "ttd" ? [
		CircuitPicker,
		CircuitOptionPicker
	] : [
		CircuitPicker,
		CarPicker,
		CircuitOptionPicker
	], [ctx.orderType])

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