import { LockClosedIcon } from "@heroicons/react/24/solid";
import useConfigContext from "components/PickMyDay/hooks/useConfigContext";
import React, { useEffect, useState } from "react"
import Button from "../../../Library/Button";
import useOrderContext from "../../hooks/useOrderContext";
import OrderPriceItem from "./OrderPriceItem";


const OrderResume: React.FC = () => {

	return <div className="order__resume">
		<ul className="order__items">
			 <OrderPriceItem/>
		</ul>
		<div className="order__submit">

			<div>
				<h4>TOTAL</h4>
				<h3>0€</h3>
			</div>

			<Button className="lock">
				<LockClosedIcon />
				Continuer
			</Button>
		</div>
	</div>
}

export default OrderResume;