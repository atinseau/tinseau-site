import React, { useId } from "react"
import useOrderContext from "../../hooks/useOrderContext"
import LocationPriceItem from "./LocationPriceItem"
import OptionResumeRender from "./OptionResumeRender"

interface Props {
	orderItem: OrderItem
	editMode: boolean
	idx: number
}


const OrderPriceItem: React.FC<Props> = ({ orderItem, editMode, idx }) => {

	const ctx = useOrderContext()

	return <li className={editMode ? "edit__mode" : ""}>

		{editMode && <div className="checkbox">
			<label>
				<input type="checkbox" checked={ctx.removeItemId.includes(idx)} onChange={(e) => {
					if (e.target.checked) ctx.updateRemoveItemId(idx, "add")
					else ctx.updateRemoveItemId(idx, "remove")
				}} />
				<span className="checkmark" />
			</label>
		</div>}

		<div className="order__price__item">
			<div>
				<h5>{orderItem.circuit.attributes.title}, <span>{orderItem.event.attributes.title}</span></h5>
				{ctx.currentItemId === idx && <div className="current__order__item" />}
			</div>

			{orderItem.order.type === "location" && <>
				{!orderItem.order.locations?.length ? <div className="no__location">
					<h6>Vous n'avez pas encore choisi de voiture</h6>
				</div> : <LocationPriceItem eventId={ctx.item?.event.id || ""} orderItem={orderItem} currentLocationId={ctx.currentLocationId}/>}
			</>}

			<ul>
				{orderItem.order.type === "ttd" && <li>
					<div>
						<p>
							<span className="mr-1">Accés piste</span>
							<span className="text-white">(x{orderItem.order.classic?.count || 1})</span>
						</p>
						<p>{orderItem.event.attributes.classic.price * (orderItem.order.classic?.count || 1)}€</p>
					</div>
				</li>}

				<OptionResumeRender
					dbOptions={orderItem.event.attributes.global_options}
					options={orderItem.order.options}
					order={orderItem.order}
				/>

				<OptionResumeRender
					dbOptions={orderItem.event.attributes.classic.options}
					options={orderItem.order.classic?.options || []}
					order={orderItem.order}
				/>
			</ul>
		</div>
	</li >
}

export default OrderPriceItem;