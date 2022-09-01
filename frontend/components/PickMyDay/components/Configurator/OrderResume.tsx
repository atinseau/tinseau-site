import { LockClosedIcon } from "@heroicons/react/24/solid";
import React from "react"
import Button from "../../../Library/Button";
import useOrderContext from "../../hooks/useOrderContext";
import OrderPriceItem from "./OrderPriceItem";


const OrderResume: React.FC = () => {

	const ctx = useOrderContext()

	return <div className="order__resume">
		<ul className="order__items">
			{ctx.items.map((item, i) => <OrderPriceItem
				key={i}
				item={item}
			/>)}
		</ul>
		<div className="order__submit">

			<div>
				<h4>TOTAL</h4>
				<h3>{ctx.getTotal()}€</h3>
			</div>

			<Button className="lock">
				<LockClosedIcon />
				Continuer
			</Button>
		</div>
	</div>
}

export default OrderResume;