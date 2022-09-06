import React from "react"

import Image from "next/future/image";
import Button from "components/Library/Button";

import bmw from "public/images/cars/bmw1.jpg"

const CarCard: React.FC = () => {

	

	return <li className="car__card">
		<Image src={bmw} />
		<div>
			<div>
				<div className="price">
					<div>
						<h3>BMW M3 E86</h3>
						<p>4 packs restantes</p>
					</div>
					<div>
						<h4>600€</h4>
						<p>4 séries de 6 tours</p>
					</div>
				</div>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere fuga dicta beatae dolorem quas explicabo sequi. A perferendis minus consequuntur et quaerat, hic id odio quia aliquam alias libero atque!</p>
			</div>
			<div className="price__control">
				<Button className="pick">Choisir</Button>
			</div>
		</div>
	</li>
}

export default CarCard;