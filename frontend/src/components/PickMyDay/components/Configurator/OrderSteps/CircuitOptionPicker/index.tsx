import { AdjustmentsVerticalIcon, InformationCircleIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid"
import React, { useEffect } from "react"
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

	return <div className="circuit__option__picker">
		<div className="picker__header">
			<h3>Ajouter des options</h3>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur quos vero, modi officia doloribus sapiente corrupti voluptates tempore asperiores aut dicta ex dolore iusto dolorem voluptatem, harum maiores. Quisquam, debitis!</p>
		</div>

		<div className="picker__container">

			{ctx.items.length > 1 && <div className="selected">
				<p>Journée selectionnée:</p>
				<div>
					<InformationCircleIcon />
					<div>
						<h4>{ctx.item?.circuit.attributes.title}</h4>
						<h5>{ctx.item?.event.attributes.title}</h5>
					</div>
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
							max={10}
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
						voiture séléctionnée: <span>{ctx.location?.car.data.attributes.name}</span>
					</p>}
				</div>
			</>}

		</div>
	</div>
}

export default CircuitOptionPicker;