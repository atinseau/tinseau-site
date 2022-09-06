import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import ComponentSwitcher from "components/Library/ComponentSwitcher";
import useConfigContext from "components/PickMyDay/hooks/useConfigContext";
import React from "react"
import Button from "../../../Library/Button";

const OptionPicker: React.FC = () => {

	const configCtx = useConfigContext()

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