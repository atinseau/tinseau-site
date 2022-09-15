import { Cog6ToothIcon, CreditCardIcon, LockClosedIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react"
import useErrorContext from "src/hooks/useErrorContext";
import Button from "../../../Library/Button";
import useConfigContext from "../../hooks/useConfigContext";
import useOrderContext from "../../hooks/useOrderContext";
import OrderPriceItem from "./OrderPriceItem";


const OrderResume: React.FC = () => {

	const ctx = useOrderContext()
	const configCtx = useConfigContext()
	const errorCtx = useErrorContext()

	const [editMode, setEditMode] = useState(false)
	const [startDeleting, setStartDeleting] = useState(false)

	const canPay = () => {
		if (ctx.items.length === 0)
			return false
		for (const item of ctx.items) {
			if (item.order.type === "location" && !item.order.locations?.length)
				return false
		}
		return true
	}

	useEffect(() => {
		if (!configCtx.isSwitching && startDeleting) {
			ctx.setBufferedItem(null)
			setStartDeleting(false)
		}
	}, [configCtx.isSwitching])

	return <div className="order__resume">

		<div className="recap">
			<h3>Récapitulatif de votre commande</h3>

			<div>
				{editMode && <TrashIcon onClick={() => {
					ctx.clearRemoveItem(configCtx.step !== 0)
					if (ctx.removeItemId.includes(ctx.currentItemId)) {
						configCtx.setStep(0)
						setStartDeleting(true)
					}
					setEditMode(false)
				}} />}
				<Cog6ToothIcon onClick={() => setEditMode(!editMode)} />
			</div>
		</div>

		<ul className="order__items">
			{ctx.items.map((item, i) => <OrderPriceItem idx={i} editMode={editMode} orderItem={item} key={i} />)}
		</ul>
		<div className="order__submit">
			<div>
				<h4>TOTAL</h4>
				<h3>{ctx.getTotal()}€</h3>
			</div>

			<Button className={!canPay() ? "lock" : ""} onClick={() => {
				if (!canPay())
					return

				console.log(ctx.items)
			}}>
				Continuer
				{!canPay() ? <LockClosedIcon /> : <CreditCardIcon />}
			</Button>
		</div>
	</div>
}

export default OrderResume;