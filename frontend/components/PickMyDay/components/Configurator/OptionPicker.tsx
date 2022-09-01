import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react"
import Button from "../../../Library/Button";
import useOrderContext from "../../hooks/useOrderContext";
import CircuitOptionPicker from "./OrderSteps/CircuitOptionPicker";

import CircuitPicker from "./OrderSteps/CircuitPicker";

const orderSteps = [
	CircuitPicker,
	CircuitOptionPicker
]

const OptionPicker: React.FC = () => {

	const [step, setStep] = useState(0)
	const ctx = useOrderContext()

	const next = () => step + 1 < orderSteps.length && setStep(step + 1)
	const prev = () => step - 1 >= 0 && setStep(step - 1)

	const Component = orderSteps[step]

	return <div className="option__picker">
		<div className="option__step__container">
			<Component next={next} prev={prev} />
		</div>
		<div className="option__picker__controller">
			<Button onClick={prev} className={step === 0 ? "disabled": ""}>
				<ChevronLeftIcon />
			</Button>
			<Button className={step + 1 === orderSteps.length || !ctx.getCurrentItem() ? "disabled": ""} onClick={() => {
				if (!ctx.getCurrentItem())
					return
				next()
			}}>
				<ChevronRightIcon />
			</Button>
		</div>
	</div>
}

export default OptionPicker;