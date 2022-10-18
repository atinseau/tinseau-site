import axios from "axios";
import React, { useEffect, useState } from "react"
import { HiDownload, HiTrash } from "react-icons/hi";
import { Button } from "src/components/Library";
import { getEnvConfig, headers } from "src/functions/getConfig";

interface Props {
	next: () => void,
	back: () => void,
	mounted: boolean
}

const List: React.FC<Props> = ({ next, back, mounted }) => {

	const [decharges, setDecharges] = useState<TTDDecharge[]>([])

	useEffect(() => {
		if (!mounted)
			return

		axios.get(getEnvConfig().SERVER_API + "/users/decharges", headers())
			.then(({ data }) => {
				console.log(data)
				setDecharges(data)
			})
	}, [])

	return <div className="decharges list">

		<div className="decharges__header">
			<h4>Vos décharges de responsabilité</h4>
			<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ea vitae esse expedita iste aperiam ipsum atque odit non perspiciatis ratione est facilis eum corporis consequuntur, exercitationem sed nam amet.</p>
		</div>

		<div className="decharges__container">
			<ul className="decharges__list">
				{decharges.map((decharge, i) => {

					const leftDays = Math.round((new Date(decharge.expiration).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

					return <li key={i}>
						<div>
							<h3>{decharge.type === "track_access" ? "Decharge annuelle" : "--"}</h3>
							<p>
								Pour <strong>{decharge.data.fullname}</strong>
								{leftDays > 0 ?
									<span>(valable encore <strong>{leftDays} jours)</strong></span> :
									<span>(<strong>expirée</strong>)</span>
								}
							</p>
						</div>
						<div className="controller">
							{leftDays > 0 && <Button>
								<HiDownload />
							</Button>}
							<Button variant="danger">
								<HiTrash />
							</Button>
						</div>
					</li>
				})}
			</ul>
		</div>

		<div className="decharges__footer">
			<Button onClick={next}>Crée une décharge de responsabilité</Button>
		</div>
	</div>
}

export default List;