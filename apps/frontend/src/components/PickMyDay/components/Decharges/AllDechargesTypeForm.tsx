import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo } from "react";
import { Button } from "src/components/Library";
import Picture from "src/components/Library/Picture";
import { useAuthContext } from "src/hooks";
import DechargeCard from "./DechargeCard";

interface Props {
	dechargeableItem: DechargeableItem
	selectedEvent: TTDEvent
}

const AllDechargesTypeForm: React.FC<Props> = ({ dechargeableItem, selectedEvent }) => {

	const router = useRouter()

	const { decharges, fetch } = useAuthContext().dechargeActions

	/**
	 * Return all decharges of a specific type
	 * and filter expired decharges for the selected event
	 * (remove decharges that expiration date cannot reach the selected event date)
	 */
	const getDechargesByType = useCallback((type: DechargeType) => {
		return decharges.filter(decharge => {
			const isRightType = decharge.type === type
			const expirationDate = new Date(decharge.expiration)
			const eventDate = new Date(selectedEvent.date)
			return isRightType && expirationDate > eventDate
		})
	}, [decharges])

	const dechargesByType = useMemo(() => {
		return getDechargesByType(dechargeableItem.type)
	}, [getDechargesByType, dechargeableItem])

	useEffect(() => {
		if (!decharges.length) {
			fetch()
		}
	}, [])

	console.log(dechargesByType)

	return !dechargesByType.length ? <div className="no__decharges">
		<h5>Vous n'avez aucune décharge de ce type</h5>
		<Button onClick={() => router.push('/my-account/responsability/new?type=' + dechargeableItem.type)}>Crée une décharge</Button>
	</div> : <div className="decharges__list__container">

		<h6>Quel décharge utiliser pour cette journée ?</h6>

		<ul className="decharges__cards">
			{dechargesByType.map((decharge) => <DechargeCard decharge={decharge} key={decharge.id} />)}
		</ul>
	</div>
}

export default AllDechargesTypeForm;