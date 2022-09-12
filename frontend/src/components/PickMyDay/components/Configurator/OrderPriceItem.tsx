import { XCircleIcon } from "@heroicons/react/24/solid"
import React from "react"
import LocationPriceItem from "./LocationPriceItem"
import OptionResumeRender from "./OptionResumeRender"

interface Props {
	orderItem: OrderItem
	editMode: boolean
}



const OrderPriceItem: React.FC<Props> = ({ orderItem, editMode }) => {
	return <li className={editMode ? "edit__mode" : ""}>

		{editMode && <div className="checkbox">
			<label>
				<input type="checkbox" />
				<span className="checkmark" />
			</label>
		</div>}

		<div className="order__price__item">
			<div>
				<h5>{orderItem.circuit.attributes.title}, <span>{orderItem.event.attributes.title}</span></h5>
			</div>

			{orderItem.order.type === "location" && <>
				{!orderItem.order.locations?.length ? <div className="no__location">
					<h6>Vous n'avez pas encore choisi de voiture</h6>
				</div> : <LocationPriceItem orderItem={orderItem} />}
			</>}

			<ul>
				{orderItem.order.type === "ttd" && <li>
					<p>
						<span className="mr-1">Accés piste</span>
						<span className="text-white">(x{orderItem.order.classic?.count || 1})</span>
					</p>
					<p>{orderItem.event.attributes.classic.price * (orderItem.order.classic?.count || 1)}€</p>
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