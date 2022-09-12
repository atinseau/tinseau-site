import { Cog6ToothIcon, CreditCardIcon, LockClosedIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react"
import Button from "../../../Library/Button";
import useOrderContext from "../../hooks/useOrderContext";
import OrderPriceItem from "./OrderPriceItem";


const OrderResume: React.FC = () => {

	const ctx = useOrderContext()

	const [editMode, setEditMode] = useState(false)

	const canPay = () => {
		if (ctx.items.length === 0)
			return false
		for (const item of ctx.items) {
			if (item.order.type === "location" && !item.order.locations?.length)
				return false
		}
		return true
	}

	return <div className="order__resume">

		<div className="recap">
			<h3>Récapitulatif de votre commande</h3>

			<div>
				{editMode && <TrashIcon />}
				<Cog6ToothIcon onClick={() => setEditMode(!editMode)} />
			</div>
		</div>

		<ul className="order__items">
			{ctx.items.map((item, i) => <OrderPriceItem editMode={editMode} orderItem={item} key={i} />)}
		</ul>
		<div className="order__submit">
			<div>
				<h4>TOTAL</h4>
				<h3>{ctx.getTotal()}€</h3>
			</div>

			<Button className={!canPay() ? "lock" : ""}>
				Continuer
				{!canPay() ? <LockClosedIcon /> : <CreditCardIcon />}
			</Button>
		</div>
	</div>
}

export default OrderResume;