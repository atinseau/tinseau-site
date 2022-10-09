import { ChevronLeftIcon } from "@heroicons/react/24/solid"
import React from "react"
import Button from "src/components/Library/Button"
import Input from "src/components/Library/Input"
import Switch from "src/components/Library/Switch"

interface Props {
	next: () => void
	back: () => void
}

const AddCar: React.FC<Props> = ({ back }) => {
	return <form className="cars new__one">
		<div className="cars__header">
			<h4>Ajout d'une nouvelle voiture</h4>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, doloribus aperiam voluptatem error iusto tempora. Aliquam labore necessitatibus rem unde modi maiores eum nobis perspiciatis fugit sit doloribus, accusantium delectus.
				Quos dignissimos, cum natus laborum saepe neque suscipit veritatis? Iste amet est error incidunt maiores hic voluptate, soluta deleniti, explicabo consequatur iure eligendi illum. Explicabo eaque mollitia autem veritatis praesentium!</p>
		</div>

		<div className="cars__container">
			<div className="cars__form">
				<div className="form__group">
					<h5>Marque</h5>
					<Input/>
				</div>

				<div className="form__group">
					<h5>Model</h5>
					<Input/>
				</div>

				<div className="form__group">
					<h5>Immatriculation</h5>
					<Input/>
				</div>

				<div className="form__group">
					<h5>Compagnie d'assurance</h5>
					<Input/>
				</div>

				
				<div className="form__group">
					<h5>Numéro contract assurance</h5>
					<Input/>
				</div>
			</div>
		</div>

		<div className="cars__footer">
			<Button onClick={back}>
				<ChevronLeftIcon />
			</Button>
			<Button type="submit">Ajouter la voiture</Button>
		</div>
	</form>
}

export default AddCar;