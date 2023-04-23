import ConfigProvider from "src/components/PickMyDay/contexts/ConfigProvider";
import React, { memo } from "react"
import OptionPicker from "./OptionPicker";
import OrderResume from "./OrderResume";
import { useOrderContext } from "src/hooks";

interface Props {
	isOnScreen: boolean
}

const Configurator = React.forwardRef<HTMLDivElement, Props>((props, ref) => {

	const ctx = useOrderContext()

	return ctx.orderType && <ConfigProvider>
		<div className={"configurator " + (!props.isOnScreen ? "inital__state" : "")} ref={ref}>
			<OptionPicker />
			<OrderResume />
		</div>
	</ConfigProvider>
})

export default memo(Configurator);