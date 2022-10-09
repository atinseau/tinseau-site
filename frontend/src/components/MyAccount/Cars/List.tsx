import React from "react"
import Button from "src/components/Library/Button";

interface Props {
	next: () => void
	back: () =>  void
}

const List: React.FC<Props> = ({ next }) => {
	return <div className="cars list">
		<div className="cars__header">
			<h4>Vos voitures</h4>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, tempora vel. Exercitationem, enim in perferendis asperiores odio consequuntur harum, voluptates sit, cumque quaerat repellat officiis consequatur quis quas illum animi?</p>
		</div>

		<div className="cars__container"></div>

		<div className="cars__footer">
			<Button onClick={next}>Ajouter une nouvelle voiture</Button>
		</div>
	</div>
}

export default List;