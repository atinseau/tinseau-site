import React, { useEffect } from "react"

import Image from "next/future/image";
import Button from "src/components/Library/Button";

import bmw from "public/images/cars/bmw1.jpg"
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import useDropdown from "src/hooks/useDropdown";

interface Props {
	location: TTDLocation
}

const LocationCard: React.FC<Props> = ({ location }) => {

	const [open, toggle, ref] = useDropdown<HTMLUListElement>()

	useEffect(() => {
		console.log(location)
	}, [])

	const images: Image[] = location.car.data.attributes.images.data

	return <li className="location__card">
		<Image src={"http://localhost:1337" + images[0].attributes.url} width={images[0].attributes.width} height={images[0].attributes.height} />
		<div>
			<div>
				<div className="price">
					<div>
						<h3>{location.car.data.attributes.name}</h3>
						<p>{location.available_series} places restantes</p>
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

export default LocationCard;