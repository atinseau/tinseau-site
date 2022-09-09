import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import ComponentSwitcher from "src/components/Library/ComponentSwitcher";
import useConfigContext from "src/components/PickMyDay/hooks/useConfigContext";
import useOrderContext from "src/components/PickMyDay/hooks/useOrderContext";
import React, { useEffect } from "react"
import Button from "../../../Library/Button";

const OptionPicker: React.FC = () => {

	const configCtx = useConfigContext()
	const orderCtx = useOrderContext()

	useEffect(() => {
		console.log(orderCtx.items)
	}, [orderCtx.items])

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
				<h4>{orderCtx.orderType === "location" ? "Vous souhaitez louer une voiture" : "Vous avez déjà une voiture"}</h4>
				<p>{orderCtx.orderType === "location" ? "Venir avec ma voiture !" : "Louer une voiture ?"}</p>
			</div>}

			<Button onClick={configCtx.prev} className={configCtx.step === 0 ? "disabled" : ""}>
				<ChevronLeftIcon />
			</Button>
			<Button onClick={() => configCtx.next()}>
				<ChevronRightIcon />
			</Button>
		</div>
	</div>
}

export default OptionPicker;