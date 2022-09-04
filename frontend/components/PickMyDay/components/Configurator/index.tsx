import ConfigProvider from "components/PickMyDay/contexts/ConfigProvider";
import useOrderContext from "components/PickMyDay/hooks/useOrderContext";
import useMounted from "hooks/useMounted";
import React, { useEffect } from "react"
import OptionPicker from "./OptionPicker";
import OrderResume from "./OrderResume";

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

export default Configurator;