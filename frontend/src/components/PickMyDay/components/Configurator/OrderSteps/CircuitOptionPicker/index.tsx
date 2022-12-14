import React from "react"

import {
	AdjustmentsVerticalIcon,
	ExclamationTriangleIcon,
	InformationCircleIcon,
	WrenchScrewdriverIcon
} from "@heroicons/react/24/solid"

import {
	CgArrowsExchangeAltV
} from "react-icons/cg"

import { Button, Incrementer } from "src/components/Library"
import { useOrderContext } from "src/hooks"
import OptionRendered from "./OptionRenderer"

interface Props {
	next: () => void
	prev: () => void
}

const CircuitOptionPicker: React.FC<Props> = () => {

	const ctx = useOrderContext()

	return <div className="circuit__option__picker">
		<div className="picker__header">
			<h3>Ajouter des options</h3>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur quos vero, modi officia doloribus sapiente corrupti voluptates tempore asperiores aut dicta ex dolore iusto dolorem voluptatem, harum maiores. Quisquam, debitis!</p>
			<p className="decharge">
				<ExclamationTriangleIcon />
				Une décharge de responsabilité vous sera demandée pour certaines options
			</p>
		</div>

		<div className="picker__container">

			{ctx.items.length > 1 && <div className="selected">
				<p>Journée selectionnée:</p>
				<div>
					<div>
						<InformationCircleIcon />
						<div>
							<h4>{ctx.item?.circuit.name}</h4>
							<h5>{ctx.item?.event.title}</h5>
						</div>
					</div>
					<Button onClick={() => ctx.nextItem()}>
						<CgArrowsExchangeAltV />
					</Button>
				</div>

			</div>}

			<h3>Option de la journée <AdjustmentsVerticalIcon /></h3>

			<ul>
				{ctx.item?.order.type === "ttd" && <li>
					<div>
						<h4>
							<ExclamationTriangleIcon />
							Accés piste
							<span>{ctx.item.event.track_access.price}€</span>
						</h4>
						<Incrementer
							count={ctx.item.order.track_access?.count || 0}
							setCount={(e) => {
								const item = ctx.item as OrderItem

								ctx.updateItem({
									...item,
									order: {
										...item.order,
										track_access: {
											...item.order.track_access as WithOrderOptions<ClassicOrderItem>,
											count: e,
										}
									}
								})
							}}
							min={1}
							max={ctx.item.event.track_access.places}
						/>
					</div>
					<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas distinctio exercitationem veritatis voluptas incidunt eligendi rerum molestiae quasi numquam nobis sit.</p>
				</li>}

				{ctx.item?.event.options.map((option, i) => <OptionRendered
					type="global"
					key={i}
					option={option}
				/>)}

				{ctx.item?.order.type === "ttd" && ctx.item?.event.track_access.options.map((option, i) => <OptionRendered
					type="track_access"
					key={i}
					option={option}
				/>)}
			</ul>

			{ctx.orderType === "location" && <>
				<div className="location__option__header">
					<h3>Option de la voiture <WrenchScrewdriverIcon /></h3>
					{(ctx.item?.order.locations?.length || 0) > 1 && <p>
						voiture séléctionnée: <span className="car__name">{ctx.location?.car.name}</span>
						<span onClick={() => {
							const locationsCount = ctx.item?.order.locations?.length || 0
							if (ctx.currentLocationId + 1 >= locationsCount) ctx.setCurrentLocationId(0)
							else ctx.setCurrentLocationId(ctx.currentLocationId + 1)
						}} className="next__car">suivante</span>
					</p>}
				</div>

				{ctx.location && ctx.location.options.length ? <>
					<ul>
						{ctx.item?.order.type === "location" && ctx.location && ctx.location.options.map((option, i) => <OptionRendered
							type="location"
							key={i}
							option={option}
						/>)}
					</ul>
				</> : <div className="no__location__option">
					<p>Actuellement aucune option disponible pour cette voiture !</p>
				</div>}


			</>}

		</div>
	</div>
}

export default CircuitOptionPicker;