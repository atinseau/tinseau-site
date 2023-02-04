import { useMemo } from "react";
import { classNames } from "src/functions/utils";
import { useOrderContext } from "src/hooks";

interface Props {
	type: DechargeType
	setType: (type: DechargeType) => void
}


const types: { label: string, value: DechargeType }[] = [
	{
		label: "Accés piste",
		value: "track_access"
	},
	{
		label: "Pilote supplémentaire",
		value: "additionnal_driver"
	},
	{
		label: "Location",
		value: "location"
	},
]

const DechargeTypeSelector: React.FC<Props> = ({ type, setType }) => {

	const orderCtx = useOrderContext()

	const filteredTypes = useMemo(() => types.filter((type) => {
		if (type.value === "additionnal_driver")
			return false
		if (type.value === "location" && !orderCtx.stockSession?.items.find(e => e.order.type === "location"))
			return false
		return true
	}), [orderCtx.stockSession])

	return <div className="decharges__type">
		<div>
			<h5>Type de décharge: </h5>
			<ul>
				{filteredTypes.map((e, i) => <li
					key={i}
					onClick={() => setType(e.value)}
					className={classNames(type === e.value && "selected")}
				>
					{e.label}
				</li>)}
			</ul>
		</div>
	</div>
}

export default DechargeTypeSelector;