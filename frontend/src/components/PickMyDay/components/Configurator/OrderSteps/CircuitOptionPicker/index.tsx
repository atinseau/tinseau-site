import { AdjustmentsVerticalIcon, ArrowLongRightIcon, InformationCircleIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid"
import React, { useEffect, useMemo } from "react"
import Button from "src/components/Library/Button"
import Incrementer from "src/components/Library/Incrementer"
import useOrderContext from "../../../../hooks/useOrderContext"
import OptionRendered from "./OptionRenderer"

interface Props {
	next: () => void
	prev: () => void

	mounted: boolean
}

const CircuitOptionPicker: React.FC<Props> = ({ prev, mounted }) => {

	const ctx = useOrderContext()

	const itemsCount = useMemo(() => ctx.items.length, [])

	return <div className="circuit__option__picker">
		<div className="picker__header">
			<h3>Ajouter des options</h3>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur quos vero, modi officia doloribus sapiente corrupti voluptates tempore asperiores aut dicta ex dolore iusto dolorem voluptatem, harum maiores. Quisquam, debitis!</p>
		</div>

		<div className="picker__container">

			{itemsCount > 1 && <div className="selected">
				<p>Journée selectionnée:</p>
				<div>
					<div>
						<InformationCircleIcon />
						<div>
							<h4>{ctx.item?.circuit.attributes.title}</h4>
							<h5>{ctx.item?.event.attributes.title}</h5>
						</div>
					</div>
					<Button onClick={() => ctx.nextItem()}>
						<ArrowLongRightIcon />
					</Button>
				</div>

			</div>}

			<h3>Option de la journée <AdjustmentsVerticalIcon /></h3>

			<ul>
				{ctx.item?.order.type === "ttd" && <li>
					<div>
						<h4>Accés piste <span>{ctx.item.event.attributes.classic.price}€</span></h4>
						<Incrementer
							count={ctx.item.order.classic?.count || 0}
							setCount={(e) => {
								const item = ctx.item as OrderItem
								ctx.updateItem({
									...item,
									order: {
										...item.order,
										classic: {
											...item.order.classic as WithOrderOptions<ClassicOrderItem>,
											count: e,
										}
									}
								})
							}}
							min={1}
							max={ctx.item.event.attributes.places}
						/>
					</div>
					<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas distinctio exercitationem veritatis voluptas incidunt eligendi rerum molestiae quasi numquam nobis sit.</p>
				</li>}

				{ctx.item?.event.attributes.global_options.map((option, i) => <OptionRendered
					type="global"
					mounted={mounted}
					key={i}
					option={option}
				/>)}

				{ctx.item?.order.type === "ttd" && ctx.item?.event.attributes.classic.options.map((option, i) => <OptionRendered
					type="classic"
					mounted={mounted}
					key={i}
					option={option}
				/>)}
			</ul>

			{ctx.orderType === "location" && <>
				<div className="location__option__header">
					<h3>Option de la voiture <WrenchScrewdriverIcon /></h3>
					{(ctx.item?.order.locations?.length || 0) > 1 && <p>
						voiture séléctionnée: <span className="car__name">{ctx.location?.car.data.attributes.name}</span>
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
							mounted={mounted}
							key={i}
							option={option}
						/>)}
					</ul>
				</>: <div className="no__location__option">
					<p>Actuellement aucune option disponible pour cette voiture !</p>
				</div>}


			</>}

		</div>
	</div>
}

export default CircuitOptionPicker;