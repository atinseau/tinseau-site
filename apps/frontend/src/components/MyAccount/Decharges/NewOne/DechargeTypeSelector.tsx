import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { classNames } from "src/functions/utils";
import { useErrorContext, useOrderContext } from "src/hooks";

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
		label: "Location",
		value: "location"
	},
]

const DechargeTypeSelector: React.FC<Props> = ({ type, setType }) => {

	const orderCtx = useOrderContext()
	const errorCtx = useErrorContext()
	const router = useRouter()

	const filteredTypes = useMemo(() => types.filter((type) => {
		if (type.value === "location" && !orderCtx.stockSession?.items.find(e => e.order.type === "location"))
			return false
		return true
	}), [orderCtx.stockSession])

	const handleTypeChange = useCallback((type: DechargeType) => {
		const queryType = router.query.type as DechargeType | undefined
		if (queryType && queryType !== type) {
			errorCtx.createError({
				message: "Il est impossible de changer le type de décharge une fois qu'il a été défini",
				title: "Type de décharge déjà défini",
				type: "danger"
			})
			return
		}
		setType(type)
	}, [router])

	return <div className="decharges__type">
		<div>
			<h5>Type de décharge: </h5>
			<ul>
				{filteredTypes.map((e, i) => <li
					key={i}
					onClick={() => handleTypeChange(e.value)}
					className={classNames(type === e.value && "selected")}
				>
					{e.label}
				</li>)}
			</ul>
		</div>
	</div>
}

export default DechargeTypeSelector;