import { ChevronLeftIcon } from "@heroicons/react/24/solid"
import React from "react"
import Button from "src/components/Library/Button"
import Input from "src/components/Library/Input"
import useErrorForm from "src/hooks/useErrorForm"

interface Props {
	next: () => void
	back: () => void
}

const AddCar: React.FC<Props> = ({ back }) => {

	const { register, handleSubmit } = useErrorForm("Impossible d'ajouter votre voiture")

	const submit = async (e: any) => {
		console.log(e)
	}

	return <form className="cars new__one" onSubmit={handleSubmit(submit)}>
		<div className="cars__header">
			<h4>Ajout d'une nouvelle voiture</h4>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, doloribus aperiam voluptatem error iusto tempora. Aliquam labore necessitatibus rem unde modi maiores eum nobis perspiciatis fugit sit doloribus, accusantium delectus.
				Quos dignissimos, cum natus laborum saepe neque suscipit veritatis? Iste amet est error incidunt maiores hic voluptate, soluta deleniti, explicabo consequatur iure eligendi illum. Explicabo eaque mollitia autem veritatis praesentium!</p>
		</div>

		<div className="cars__container">
			<div className="cars__form">
				<div className="form__group">
					<h5>Marque</h5>
					<Input {...register("model", { required: { value: true, message: "Veuillez entrer le model de votre voiture" } })}/>
				</div>

				<div className="form__group">
					<h5>Model</h5>
					<Input {...register("brand", { required: { value: true, message: "Veuillez renseigner la marque de votre voiture" } })}/>
				</div>

				<div className="form__group">
					<h5>Immatriculation</h5>
					<Input {...register("registration", { required: { value: true, message: "Veuillez renseigner l'immatriculation de votre voiture" } })}/>
				</div>

				<div className="form__group">
					<h5>Compagnie d'assurance</h5>
					<Input {...register("assurance_name", { required: { value: true, message: "Le nom de l'assurance de cette voiture est manquante" } })}/>
				</div>

				
				<div className="form__group">
					<h5>Numéro contract assurance</h5>
					<Input {...register("assurance_number", { required: { value: true, message: "Le numéro de l'assurance de cette voiture est manquante" } })}/>
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