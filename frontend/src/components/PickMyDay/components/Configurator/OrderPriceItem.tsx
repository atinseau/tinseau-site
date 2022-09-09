import { TrashIcon } from "@heroicons/react/24/solid"
import React, { useEffect } from "react"
import useOrderContext from "../../hooks/useOrderContext"

interface Props {
	orderItem: OrderItem
}

const OrderPriceItem: React.FC<Props> = ({ orderItem }) => {
	
	return <li>
		<div>
			<h5>{orderItem.circuit.attributes.title}, <span>{orderItem.event.attributes.title}</span></h5>
			<div>
				<TrashIcon/>
			</div>
		</div>

		{orderItem.order.type === "location" && <>
			{!orderItem.order.location ? <div className="no__location">
				<h6>Vous n'avez pas encore choisi de voiture</h6>
			</div>: <ul>
				<li>
					<p><span className="mr-1">sqdqsd </span><span className="text-white">(x2)</span></p>
					<p>100€</p>
				</li>
			</ul>}
		</>}

		{/* <ul>
			<li>
				<p><span className="mr-1">sqdqsd </span><span className="text-white">(x2)</span></p>
				<p>100€</p>
			</li>
		</ul> */}
	</li>
}

export default OrderPriceItem;