import { useEffect, useMemo, useRef, useState } from "react";
import { useOrderContext } from "src/hooks";
import CarPicker from "../components/Configurator/OrderSteps/CarPicker";
import CircuitOptionPicker from "../components/Configurator/OrderSteps/CircuitOptionPicker";
import CircuitPicker from "../components/Configurator/OrderSteps/CircuitPicker";
import ConfigContext from "./ConfigContext";

interface Props {
	children: React.ReactNode;
}

const ComponentsProfil = {
	0: [
		CircuitPicker,
		CircuitOptionPicker
	],
	1: [
		CircuitPicker,
		CarPicker,
		CircuitOptionPicker
	]
}

const getComponentProfil = (type: OrderType | null) => type === "ttd" ? ComponentsProfil[0] : ComponentsProfil[1]

const ConfigProvider: React.FC<Props> = ({ children }) => {

	const ctx = useOrderContext()

	const [shouldAnimate, setShouldAnimate] = useState(true)
	const [step, setStep] = useState(0)
	const [isSwitching, setIsSwitching] = useState(false)

	const [orderTypeBuffer, setOrderTypeBuffer] = useState(ctx.orderType)

	const [dispatchDirectionEvent, setDispatchDirectionEvent] = useState({
		nextStep: -1,
		shouldAnimate: true
	})

	useEffect(() => {
		if (dispatchDirectionEvent.nextStep === -1)
			return
		setStep(dispatchDirectionEvent.nextStep)
		setShouldAnimate(dispatchDirectionEvent.shouldAnimate)
		setDispatchDirectionEvent({
			nextStep: -1,
			shouldAnimate: true
		})
	}, [dispatchDirectionEvent])

	const steps = useMemo(() =>
		getComponentProfil(ctx.orderType),
		[orderTypeBuffer]
	)

	const next = () => {
		if (!isSwitching && step + 1 < steps.length)
			setDispatchDirectionEvent({ nextStep: step + 1, shouldAnimate: true })
	}

	const prev = () => {
		if (!isSwitching && step - 1 >= 0)
			setDispatchDirectionEvent({ nextStep: step - 1, shouldAnimate: true })
	}

	useEffect(() => {
		if (ctx.orderType !== orderTypeBuffer && step === steps.length - 1) {
			setShouldAnimate(false)
			setStep(getComponentProfil(ctx.orderType).length - 1)
		}
		setOrderTypeBuffer(ctx.orderType)
	}, [ctx.orderType])


	useEffect(() => {
		if (!shouldAnimate) {
			console.log("need to reset")
		}
	}, [shouldAnimate])

	return <ConfigContext.Provider value={{
		step,
		shouldAnimate,
		isSwitching,
		steps,
		setStep,
		setIsSwitching,
		setShouldAnimate,
		next,
		prev
	}}>
		{children}
	</ConfigContext.Provider>
}

export default ConfigProvider;