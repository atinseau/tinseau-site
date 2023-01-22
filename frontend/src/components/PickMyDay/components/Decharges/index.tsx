import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useDechargesOpen from "../../hooks/useDechargesOpen";
import Counter, { CounterRef } from "src/components/Library/Counter";
import useDechargeItem from "../../hooks/useDechargeItem";
import AdditionnalDriverForm from "./AdditionnalDriverForm";
import AllDechargesTypeForm from "./AllDechargesTypeForm";
import ListOfRequiredDecharge from "./ListOfRequiredDecharge";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useOrderContext } from "src/hooks";

interface Props {
	close: () => void
}


const CounterDisplayer: React.FC<{ endDate: string }> = ({ endDate }) => {
	const counterRef = useRef<CounterRef>(null)
	return !counterRef.current?.isExpired || false ? <p className="counter">
		Vos places seront reservé pendent encore <Counter endDate={endDate} ref={counterRef} />
	</p> : null
}

const OrderDecharges: React.FC<Props> = ({ close }) => {

	const orderCtx = useOrderContext()

	const [selectedEvent, setSelectedEvent] = useState(0)

	const [eventsPayload, setEventsPayload] = useState<EventsPayload>(orderCtx.items.map((e) => e.event.id).reduce((acc, e, index) => {
		return {
			...acc, [e]: {
				selectedDechargeableItem: 0,
				meta: {}
			}
		}
	}, {}))

	const { containerRef, modalRef, handleClose } = useDechargesOpen(close)

	const { dechargeableItems, selectedDechargeableItem, setSelectedDechargeableItem } = useDechargeItem(selectedEvent, eventsPayload, setEventsPayload)

	useEffect(() => {
		console.log(dechargeableItems)
	}, [dechargeableItems])

	return createPortal(<div className="order__decharges" ref={modalRef}>
		<div className="decharges__container" ref={containerRef} onClick={(e) => e.stopPropagation()}>
			<div className="decharges__header">
				<h2>Terminer l'enregistrement</h2>
				<XMarkIcon onClick={() => handleClose().then(() => orderCtx.deleteStockSession())} />
			</div>

			<div className="decharges__body">

				<div className="left">
					<h4>Décharge de responsabilité</h4>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum neque officiis hic quisquam recusandae omnis, distinctio consectetur laudantium vel eos excepturi dolore porro non voluptate atque odio! Culpa, ea vero?</p>

					{orderCtx.stockSession && <CounterDisplayer endDate={orderCtx.stockSession?.remainingTime} />}

					<h5>Votre décharge est pour un(e) ?</h5>
					<ul>
						{dechargeableItems.map((item, index) => <li
							onClick={() => setSelectedDechargeableItem(index)}
							key={index}
							className={selectedDechargeableItem === index ? "selected" : ""}
						>
							{item.name}
						</li>)}
					</ul>

					<div className="decharges__list">

						{dechargeableItems[selectedDechargeableItem].type === "additionnal_driver" ?
							<AdditionnalDriverForm
								eventsPayload={eventsPayload}
								selectedEvent={orderCtx.items[selectedEvent].event}
								setEventsPayload={setEventsPayload}
							/> :
							<AllDechargesTypeForm />
						}

					</div>
				</div>

				<ListOfRequiredDecharge
					items={orderCtx.items}
					dechargeableItems={dechargeableItems}
					selectedEvent={orderCtx.items[selectedEvent].event}
					setSelectedEvent={setSelectedEvent}
					eventsPayload={eventsPayload}
				/>

			</div>
		</div>
	</div>, document.body)
}

export default OrderDecharges;