import React, { useEffect } from "react"
import { Button } from "src/components/Library";
import { useSwitcherContext } from "src/components/Library/ComponentSwitcher";
import { useAuthContext } from "src/hooks";
import DechargeItem from "./DechargeItem";

interface Props {
	next: () => void,
	back: () => void
}

const List: React.FC<Props> = ({ next, back }) => {

	const authCtx = useAuthContext()
	const switcherCtx = useSwitcherContext()

	const { decharges, fetch, remove } = authCtx.dechargeActions

	useEffect(() => {
		if (!switcherCtx.isMounted)
			return
		fetch()
	}, [])

	return <div className="decharges list">

		<div className="decharges__header">
			<h4>Vos décharges de responsabilité</h4>
			<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ea vitae esse expedita iste aperiam ipsum atque odit non perspiciatis ratione est facilis eum corporis consequuntur, exercitationem sed nam amet.</p>
		</div>

		<div className="decharges__container">
			{decharges.length ? <ul className="decharges__list">
				{decharges.map((decharge, i) => <DechargeItem key={i} decharge={decharge} remove={remove} />)}
			</ul> : <div className="no__decharges">
				<p>Vous n'avez crée aucune décharge de responsabilité !</p>
			</div>}
		</div>

		<div className="decharges__footer">
			<Button onClick={next}>Crée une décharge de responsabilité</Button>
		</div>
	</div>
}

export default List;