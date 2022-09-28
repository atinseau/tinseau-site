import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react"
import Button from "src/components/Library/Button";
import useDropdown from "src/hooks/useDropdown";

interface Props {

}

const NewOne: React.FC<Props> = () => {

	const [open, toggle, ref] = useDropdown<HTMLUListElement>()

	return <div className="decharges new__one">
		<div className="decharges__header">
			<h4>Création d'une nouvelle décharge de responsabilité</h4>
			<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim vel dolor at esse nulla aliquam a? Doloribus impedit pariatur blanditiis accusantium ullam harum nostrum? Corporis cumque molestias quia in fugit.</p>
		</div>

		<div className="decharges__container">
			
			<div className="decharges__type">
				<div>
					<h5>Type de décharge: </h5>
					<p>Accés piste  <ChevronDownIcon/></p>
				</div>

				{open && <ul ref={ref}>
					<li></li>
				</ul>}
			</div>

		</div>

		<div className="decharges__footer">
			<Button>Crée la décharge</Button>
		</div>
	</div>
}

export default NewOne;