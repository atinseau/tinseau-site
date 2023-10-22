import { memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useDechargesOpen from "../../hooks/useDechargesOpen";
import Counter, { CounterRef } from "src/components/Library/Counter";
import useDechargeItem from "../../hooks/useDechargeItem";
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

	const { containerRef, modalRef, handleClose } = useDechargesOpen(close)

	const { dechargeableItem } = useDechargeItem(selectedEvent)

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

					<h5>Cette journée concerne un(e) <span className="selected">{dechargeableItem.name}</span></h5>

					<div className="decharges__list">
						<AllDechargesTypeForm
							dechargeableItem={dechargeableItem}
							selectedEvent={orderCtx.items[selectedEvent].event}
						/>
					</div>
				</div>

				<ListOfRequiredDecharge
					items={orderCtx.items}
					dechargeableItem={dechargeableItem}
					selectedEvent={orderCtx.items[selectedEvent].event}
					setSelectedEvent={setSelectedEvent}
				/>

			</div>
		</div>
	</div>, document.body)
}

export default memo(OrderDecharges);