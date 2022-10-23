import React, { useEffect } from "react"
import { Button } from "src/components/Library";
import { useSwitcherContext } from "src/components/Library/ComponentSwitcher";
import { useAuthContext } from "src/hooks";
import CarItem from "./CarItem";

interface Props {
	next: () => void
}

const List: React.FC<Props> = ({ next }) => {

	const authCtx = useAuthContext()
	const switcherCtx = useSwitcherContext()

	const { cars, fetch, remove } = authCtx.carActions

	useEffect(() => {
		if (!switcherCtx.isMounted)
			return
		fetch()
	}, [])

	return <div className="cars list">
		<div className="cars__header">
			<h4>Vos voitures</h4>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, tempora vel. Exercitationem, enim in perferendis asperiores odio consequuntur harum, voluptates sit, cumque quaerat repellat officiis consequatur quis quas illum animi?</p>
		</div>

		<div className="cars__container">
			{cars.length ? <ul>
				{cars.map((car, i) => <CarItem key={i} car={car} remove={remove} />)}
			</ul> : <div className="no__cars">
				<p>Vous n'avez pas encore ajouté de voiture !</p>
			</div>}
		</div>

		<div className="cars__footer">
			<Button onClick={next}>Ajouter une nouvelle voiture</Button>
		</div>
	</div>
}

export default List;