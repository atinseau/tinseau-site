import useOrderContext from "src/components/PickMyDay/hooks/useOrderContext";

const DechargeTypeSelector = () => {

	const orderCtx = useOrderContext()

	

	return <div className="decharges__type">
		<div>
			<h5>Type de décharge: </h5>
			<ul>
				{orderCtx.stockSession && <li>Location</li>}
				<li className="selected">Accés piste</li>
				<li>Pilote supplémentaire</li>
			</ul>
		</div>
	</div>
}

export default DechargeTypeSelector;