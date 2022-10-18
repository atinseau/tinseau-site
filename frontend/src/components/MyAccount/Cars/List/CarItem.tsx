import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Button } from "src/components/Library";
import Modal, { useModal } from "src/components/Library/Modal";

interface Props {
	car: UserCar
	remove: (id: string) => void
}

const CarItem: React.FC<Props> = ({ car, remove }) => {

	const { toggle, isOpen, ref } = useModal()

	return <>
		<li>
			<img src={"https://via.placeholder.com/300x150"} />
			<div className="car__data">
				<h4>Model: {car.model}</h4>

				<div>
					<p>Marque: <strong>{car.brand}</strong></p>
					<p>Assurance: <strong>{car.assurance_name}</strong></p>
					<p>Numéro d'assurance: <strong>{car.assurance_number}</strong></p>
					<p>Immatriculation: <strong>{car.registration}</strong></p>
				</div>

				<p className="added">Ajouté le: <strong>{new Date(car.created_at).toLocaleDateString()}</strong></p>
			</div>

			<div className="trash__icon" onClick={() => toggle()}>
				<TrashIcon />
			</div>
		</li>
		{isOpen && <Modal ref={ref}>
			<div className="car__modal">
				<h4>Suppression de la voiture</h4>
				<p>Êtes-vous sûr de vouloir supprimer cette voiture ?</p>

				<div className="car__modal__buttons">
					<Button onClick={toggle} variant="danger">Annuler</Button>
					<Button onClick={() => remove(car.id)}>Supprimer</Button>
				</div>
			</div>
		</Modal>}
	</>
}

export default CarItem;