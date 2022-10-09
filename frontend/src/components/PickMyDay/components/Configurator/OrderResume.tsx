import { Cog6ToothIcon, CreditCardIcon, LockClosedIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react"
import { VscLoading } from "react-icons/vsc";
import useAuthContext from "src/hooks/useAuthContext";
import useErrorContext from "src/hooks/useErrorContext";
import Button from "../../../Library/Button";
import useConfigContext from "../../hooks/useConfigContext";
import useOrderContext from "../../hooks/useOrderContext";
import OrderDecharges from "../Decharges";
import OrderPriceItem from "./OrderPriceItem";

interface Props {

}

const OrderResume: React.FC<Props> = () => {

	const [loading, setLoading] = useState(false)

	const ctx = useOrderContext()
	const configCtx = useConfigContext()
	const errorCtx = useErrorContext()
	const authCtx = useAuthContext()

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

				if (!authCtx.user) {
					errorCtx.createError({
						title: "Vous n'êtes pas connecté",
						message: "Vous devez être connecté pour pouvoir passer une commande",
						type: "danger"
					})
					authCtx.toggleLoginModal("login")
					return
				}

				setLoading(true)
				ctx.startStockSession(() => {
					setLoading(false)
					ctx.setOpenDechargeDialog(true)
				})
			}}>
				{!loading ? <>
					Continuer
					{!canPay() ? <LockClosedIcon /> : <CreditCardIcon />}
				</> : <VscLoading className="animate-spin" />}
			</Button>
		</div>


		{ctx.openDechargeDialog && <OrderDecharges
			close={() => ctx.setOpenDechargeDialog(false)}
		/>}
	</div>
}

export default OrderResume;