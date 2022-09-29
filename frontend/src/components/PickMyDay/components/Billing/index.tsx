import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

import useOrderContext from "../../hooks/useOrderContext";
import { getLocationByCarId } from "../../contexts/OrderContext";
import useBillingOpen from "../../hooks/useBillingOpen";

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

const OrderBilling: React.FC<Props> = ({ close }) => {

	const orderCtx = useOrderContext()

	const { containerRef, modalRef, handleClose } = useBillingOpen(close)

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

	return createPortal(<div className="order__billing" ref={modalRef} onClick={handleClose}>
		<div className="billing__container" ref={containerRef} onClick={(e) => e.stopPropagation()}>
			<div className="billing__header">
				<h2>Terminer l'enregistrement</h2>
			</div>

			<div className="billing__body">

				<h4>Décharge de responsabilité</h4>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum neque officiis hic quisquam recusandae omnis, distinctio consectetur laudantium vel eos excepturi dolore porro non voluptate atque odio! Culpa, ea vero?</p>

				<p className="counter">Vos places seront reservé pendent encore {new Date().getMinutes()}min !</p>

				<h5>Votre décharge est pour un(e) ?</h5>
				<ul>
					{dechargeableItems.map((item, index) => <li onClick={() => setSelectedDechargeableItem(index)} key={index} className={selectedDechargeableItem === index ? "selected": ""}>
						{item.name}
					</li>)}
				</ul>

			</div>
		</div>
	</div>, document.body)
}

export default OrderBilling;