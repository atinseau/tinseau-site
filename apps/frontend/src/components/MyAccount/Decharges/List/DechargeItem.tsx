import React, { useEffect } from "react"
import { HiDownload, HiTrash } from "react-icons/hi"
import { Button } from "src/components/Library"
import Modal, { useModal } from "src/components/Library/Modal"
import { downloadDecharge } from "src/functions/download"

interface Props {
	decharge: TTDDecharge
	remove: (id: string) => void
}

const DechargeItem: React.FC<Props> = ({ decharge, remove }) => {

	const { toggle, isOpen, ref } = useModal()
	const leftDays = Math.round((new Date(decharge.expiration).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

	return <>
		<li>
			<div>
				<h3>{decharge.type === "track_access" ? "Decharge annuelle" : "--"}</h3>
				<p>
					Pour <strong>{decharge.data.fullname}</strong>
					{leftDays > 0 ?
						<span>(valable encore <strong>{leftDays} jours)</strong></span> :
						<span>(<strong>expirée</strong>)</span>
					}
				</p>

				{decharge.type === "track_access" &&
					<>
						<p className="car">Avec la voiture <strong>{decharge.data.car.brand}, {decharge.data.car.model}</strong>, tout circuit</p>
					</>
				}
			</div>
			<div className="controller">
				{leftDays > 0 && <Button onClick={() => downloadDecharge(decharge.type, decharge.id)}>
					<HiDownload />
				</Button>}
				<Button variant="danger" onClick={toggle}>
					<HiTrash />
				</Button>
			</div>
		</li>

		{isOpen && <Modal ref={ref}>
			<div className="decharge__modal">
				<h4>Suppression de la décharge</h4>
				<p>Êtes-vous sûr de vouloir supprimer cette décharge ?</p>

				<div className="decharge__modal__buttons">
					<Button onClick={toggle} variant="danger">Annuler</Button>
					<Button onClick={() => remove(decharge.id)}>Supprimer</Button>
				</div>
			</div>
		</Modal>}
	</>
}

export default DechargeItem;