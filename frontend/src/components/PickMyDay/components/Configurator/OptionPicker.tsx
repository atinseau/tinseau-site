import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import useConfigContext from "src/components/PickMyDay/hooks/useConfigContext";
import useOrderContext from "src/components/PickMyDay/hooks/useOrderContext";
import React from "react"
import Button from "../../../Library/Button";
import ComponentSwitcher from "../ComponentSwitcher";

const OptionPicker: React.FC = () => {

	const configCtx = useConfigContext()
	const orderCtx = useOrderContext()

	const isDisabled = () => {
		if (orderCtx.orderType === "location") {
			if (configCtx.step === 0) {
				if (!orderCtx.item)
					return true
			}
			if (configCtx.step === 1) {
				if (!orderCtx.item?.order.locations)
					return true
			}
		}

		if (orderCtx.orderType === "ttd") {
			if (!orderCtx.item)
				return true
		}

		if (configCtx.step === configCtx.steps.length - 1)
			return true

		return false
	}

	return <div className="option__picker">
		<div className="option__step__container">
			<ComponentSwitcher
				components={configCtx.steps}
				props={{
					next: configCtx.next,
					prev: configCtx.prev
				}}
				isSwitching={configCtx.isSwitching}
				setIsSwitching={configCtx.setIsSwitching}
				index={configCtx.step}
			/>
		</div>
		<div className="option__picker__controller">

			{configCtx.step === 0 && <div className="order__mode" onClick={() => orderCtx.setOrderType(orderCtx.orderType === "location" ? "ttd" : "location")}>
				<h4>Mode | {orderCtx.orderType === "location" ? "Location de voiture" : "Voiture personnelle"}</h4>
				<p>{orderCtx.orderType === "location" ? "Venir avec ma voiture !" : "Louer une voiture ?"}</p>
			</div>}

			<Button onClick={configCtx.prev} className={configCtx.step === 0 ? "disabled" : ""}>
				<ChevronLeftIcon />
			</Button>
			<Button className={isDisabled() ? "disabled": ""} onClick={() => !isDisabled() && configCtx.next()}>
				<ChevronRightIcon />
			</Button>
		</div>
	</div>
}

export default OptionPicker;