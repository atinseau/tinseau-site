import { TrashIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react"
import { Button } from "src/components/Library";
import useAuthContext from "src/hooks/useAuthContext";
import CarItem from "./CarItem";

interface Props {
	next: () => void
	mounted: boolean
}

const List: React.FC<Props> = ({ next, mounted }) => {

	const authCtx = useAuthContext()
	const { cars, fetch, remove } = authCtx.carActions

	useEffect(() => {
		if (!mounted)
			return
		fetch()
	}, [])

	return <div className="cars list">
		<div className="cars__header">
			<h4>Vos voitures</h4>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, tempora vel. Exercitationem, enim in perferendis asperiores odio consequuntur harum, voluptates sit, cumque quaerat repellat officiis consequatur quis quas illum animi?</p>
		</div>

		<div className="cars__container">
			<ul>
				{cars.map((car, i) => <CarItem key={i} car={car} remove={remove} />)}
			</ul>
		</div>

		<div className="cars__footer">
			<Button onClick={next}>Ajouter une nouvelle voiture</Button>
		</div>
	</div>
}

export default List;