import React from "react"

import Image from "next/future/image";
import Button from "src/components/Library/Button";

import bmw from "public/images/cars/bmw1.jpg"
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import useDropdown from "src/hooks/useDropdown";

const CarCard: React.FC = () => {

	const [open, toggle, ref] = useDropdown<HTMLUListElement>()


	return <li className="car__card">
		<Image src={bmw} />
		<div>
			<div>
				<div className="price">
					<div>
						<h3>BMW M3 E86</h3>
						<p>4 places restantes</p>
					</div>
					<div>
						<div className="format__dropdown" onClick={toggle}>
							<p>4 série de 6 tours</p>
							<ChevronDownIcon />

							{open && <ul ref={ref}>
								<li>8 série de 6 tours</li>
								<li>12 série de 6 tours</li>
								<li>exclusivité sur la journée</li>
							</ul>}
						</div>
						<h4>600€</h4>
					</div>
				</div>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere fuga dicta beatae dolorem quas explicabo sequi. A perferendis minus consequuntur et quaerat, hic id odio quia aliquam alias libero atque!</p>
			</div>
			<Button>Choisir</Button>
		</div>
	</li>
}

export default CarCard;