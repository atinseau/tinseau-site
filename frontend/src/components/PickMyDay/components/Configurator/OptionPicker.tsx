import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import useConfigContext from "src/components/PickMyDay/hooks/useConfigContext";
import React from "react"
import { Button } from "src/components/Library";
import ComponentSwitcher from "src/components/Library/ComponentSwitcher";
import { useOrderContext } from "src/hooks";

const OptionPicker: React.FC = () => {

	const configCtx = useConfigContext()
	const orderCtx = useOrderContext()

	const isDisabled = () => {
		// if (orderCtx.orderType === "location") {
		// 	if (configCtx.step === 0 && !orderCtx.item)
		// 		return true
		// 	if (configCtx.step === 1 && !orderCtx.item?.order.locations?.length)
		// 		return true
		// }
		// if (
		// 	(orderCtx.orderType === "ttd" && !orderCtx.item) ||
		// 	(configCtx.step === configCtx.steps.length - 1)
		// )
		// 	return true
		// return false

		if (orderCtx.orderType !== orderCtx.item?.order.type)
			return true

		if (orderCtx.orderType === "location") {
			if (configCtx.step === 0) {
				if (!orderCtx.item)
					return true
			}
			if (configCtx.step === 1) {
				if (!orderCtx.item?.order.locations?.length)
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
				shouldAnimate={configCtx.shouldAnimate}
				index={configCtx.step}
			/>
		</div>
		<div className="option__picker__controller">

			{configCtx.step === 0 && <Button className="order__mode" onClick={() => orderCtx.setOrderType(orderCtx.orderType === "location" ? "ttd" : "location")}>
				{orderCtx.orderType === "location" ? "Je souhaite un circuit" : "Je souhaite une location"}
			</Button>}

			{/* {configCtx.step === configCtx.steps.length - 1 && <> */}
			{/* <Button variant="secondary">Circuit supplémentaire ?</Button>
				{orderCtx.orderType === "location" && <Button onClick={() => configCtx.prev()}>Location supplémentaire ?</Button>} */}
			{/* </>} */}

			<Button onClick={configCtx.prev} variant={configCtx.step === 0 ? "disabled" : "primary"}>
				<HiChevronLeft />
			</Button>
			<Button variant={isDisabled() ? "disabled" : "primary"} onClick={() => !isDisabled() && configCtx.next()}>
				<HiChevronRight />
			</Button>
		</div>
	</div>
}

export default OptionPicker;