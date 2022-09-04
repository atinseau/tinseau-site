import { TrashIcon } from "@heroicons/react/24/solid"
import React, { useEffect } from "react"

interface Props {
	
}

const OrderPriceItem: React.FC<Props> = () => {


	return <li>
		<div>
			<h5>qsdqsdq, <span>qsdqsd</span></h5>
			<div>
				<TrashIcon/>
			</div>
		</div>
		<ul>
			<li>
				<p><span className="mr-1">sqdqsd </span><span className="text-white">(x2)</span></p>
				<p>100€</p>
			</li>
		</ul>
	</li>
}

export default OrderPriceItem;