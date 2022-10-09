import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useOrderContext from "../../hooks/useOrderContext";
import { getLocationByCarId } from "../../contexts/OrderContext";
import useDechargesOpen from "../../hooks/useDechargesOpen";
import Button from "src/components/Library/Button";
import { useRouter } from "next/router";
import Counter, { CounterRef } from "src/components/Library/Counter";

interface Props {
	close: () => void
}

const extractDechargeableOptions = (dbOptions: TTDOption[], options: OrderOption[]) => {
	const extractedOptions = []
	for (const option of dbOptions) {
		if (option.dechargeable) {
			const optionItem = options.find(o => o.name === option.name)
			if (optionItem) {
				extractedOptions.push({
					name: option.name,
					required_amount: option.settings.type === "bool" ? 1 : optionItem.value
				})
			}
		}
	}
	return extractedOptions
}


const CounterDisplayer: React.FC<{ endDate: string }> = ({ endDate }) => {
	const counterRef = useRef<CounterRef>(null)
	return !counterRef.current?.isExpired || false ? <p className="counter">
		Vos places seront reservé pendent encore <Counter endDate={endDate} ref={counterRef} />
	</p> : null
}

const OrderDecharges: React.FC<Props> = ({ close }) => {

	const orderCtx = useOrderContext()
	const router = useRouter()

	const { containerRef, modalRef, handleClose } = useDechargesOpen(close)

	const [selectedEvent, setSelectedEvent] = useState(0)
	const [selectedDechargeableItem, setSelectedDechargeableItem] = useState(0)

	const dechargeableItems = useMemo(() => {
		const items = []
		const item = orderCtx.items[selectedEvent]

		if (item.order.type === "location") {
			items.push({
				name: "Location",
				required_amount: 1
			})
		} else if (item.order.type === "ttd") {
			items.push({
				name: "Accés piste",
				required_amount: item.order.track_access?.count || 1
			})
		}

		items.push(...extractDechargeableOptions(item.event.options, item.order.options))
		items.push(...extractDechargeableOptions(item.event.track_access.options, item.order.track_access?.options || []))
		for (const locationItem of item.order.locations || []) {
			const location = getLocationByCarId(locationItem.car_id, item.event.locations)
			if (!location) continue
			items.push(...extractDechargeableOptions(location.options, locationItem.options))
		}
		return items
	}, [selectedEvent])

	return createPortal(<div className="order__decharges" ref={modalRef}>
		<div className="decharges__container" ref={containerRef} onClick={(e) => e.stopPropagation()}>
			<div className="decharges__header">
				<h2>Terminer l'enregistrement</h2>
			</div>

			<div className="decharges__body">

				<div className="left">
					<h4>Décharge de responsabilité</h4>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum neque officiis hic quisquam recusandae omnis, distinctio consectetur laudantium vel eos excepturi dolore porro non voluptate atque odio! Culpa, ea vero?</p>

					{orderCtx.stockSession && <CounterDisplayer endDate={orderCtx.stockSession?.remainingTime} />}

					<h5>Votre décharge est pour un(e) ?</h5>
					<ul>
						{dechargeableItems.map((item, index) => <li onClick={() => setSelectedDechargeableItem(index)} key={index} className={selectedDechargeableItem === index ? "selected" : ""}>
							{item.name}
						</li>)}
					</ul>

					<div className="decharges__list">

						<div className="no__decharges">
							<h5>Vous n'avez aucune décharge de ce type</h5>
							<Button onClick={() => router.push('/my-account/responsability?startBy=new')}>Crée une décharge</Button>
						</div>

					</div>
				</div>

				<div className="right">
					<h4>à fourir pour: </h4>

					<ul className="event__list">
						{orderCtx.items.map((item, index) => <li key={index} onClick={() => setSelectedEvent(index)}>
							<div>
								<h5>{index === selectedEvent && <span className="current" />} {item.event.title}</h5>
								<h6>{item.circuit.name}</h6>
							</div>
							<Button variant={index === selectedEvent ? "disabled" : "primary"}>Fournir</Button>
						</li>)}
					</ul>
				</div>

			</div>

			{/* <div className="decharges__footer">
				<Button variant="danger" onClick={() => {
					orderCtx.deleteStockSession()
					handleClose()
				}}>Retour</Button>
			</div> */}
		</div>
	</div>, document.body)
}

export default OrderDecharges;