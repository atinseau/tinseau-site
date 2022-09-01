import React from "react"
import OrderProvider from "../../contexts/OrderProvider";
import OptionPicker from "./OptionPicker";
import OrderResume from "./OrderResume";

interface Props {
	isOnScreen: boolean
}

const Configurator = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
	return <OrderProvider>
		<div className={"configurator " + (!props.isOnScreen ? "inital__state" : "")} ref={ref}>
			<OptionPicker />
			<OrderResume />
		</div>
	</OrderProvider>
})

export default Configurator;