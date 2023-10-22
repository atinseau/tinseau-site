import Link from "next/link";
import { useEffect, useMemo } from "react";
import type { UseFormRegister, FieldValues, Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Dropdown, Input } from "src/components/Library";
import { useSwitcherContext } from "src/components/Library/ComponentSwitcher";

import { useAuthContext, useOrderContext } from "src/hooks";

interface Props {
	register: UseFormRegister<FieldValues>
	control: Control<FieldValues, any>
	type: DechargeType
}

const DechargeForm: React.FC<Props> = ({ register, control, type }) => {

	const authCtx = useAuthContext()
	const switcherCtx = useSwitcherContext()
	const orderCtx = useOrderContext();

	const { cars, fetch } = authCtx.carActions

	const locations = useMemo(() => { // get all car with location_id for the current stock session
		if (!orderCtx.stockSession || type !== "location")
			return []

		return orderCtx.stockSession.items.filter(e => e.order.type === "location").map((e) => { // get all items in the active stock session
			return e.event.locations.map((c) => {
				const relatedLocation = e.order.locations?.find((l) => l.car_id === c.car.id) // get the related location for the car
				if (!relatedLocation)
					return null
				return { // return the car with the location id
					...c.car,
					location_id: relatedLocation?.id
				}
			}).filter((e) => e) as (TTDCar & { location_id: string })[] // filter out null values
		}).reduce((acc, curr) => [...acc, ...curr], []) // flatten the array
	}, [orderCtx.stockSession, type])

	useEffect(() => {
		if (!switcherCtx.isMounted)
			return
		fetch()
	}, [])

	return <div className="decharges__form">
		<div className="form__group">
			<h5>Nom et prénom</h5>
			<Input placeholder="Nom et prénom" {...register('fullname', { required: { value: true, message: "Il faut un nom et un prénom" }, })} />
		</div>

		<div className="form__group">
			<h5>Adresse</h5>
			<Input placeholder="Adresse" {...register('address', { required: { value: true, message: "Merci de fournir une adresse" } })} />
		</div>

		<div className="form__group">
			<h5>Code postal</h5>
			<Input type={"number"} placeholder="Code postal" {...register('postal', { required: { value: true, message: "Merci de fournir votre code postal" } })} />
		</div>

		<div className="form__group">
			<h5>Email</h5>
			<Input type={"email"} placeholder="Email" {...register('email', { required: { value: true, message: "Il faut renseigné un email" } })} />
		</div>

		<div className="form__group">
			<h5>Tel. Portable</h5>
			<Input type={"tel"} placeholder="Tel. Portable" {...register('tel', { required: { value: true, message: "Il faut renseigné un numéro de téléphone" }, })} />
		</div>

		<div className="form__group">
			<h5>Ville</h5>
			<Input placeholder="Ville" {...register('city', { required: { value: true, message: "Merci de renseigné votre ville" } })} />
		</div>

		<div className="form__group">
			<h5>Profession</h5>
			<Input placeholder="Profession" {...register('jobs', { required: { value: true, message: "Votre profession est manqante" } })} />
		</div>

		<div className="form__group">
			<h5>Numéro de permis de conduire</h5>
			<Input placeholder="Numéro de permis de conduire" {...register('license', { required: { value: true, message: "Vous n'avez pas entré de numéro de permis de conduire" } })} />
		</div>

		<div className="form__group dropdown__cars">
			<h5>Séléctionner votre {type === "track_access" ? "voiture" : "location"}</h5>
			<Controller
				name={type === "track_access" ? "car_id" : "location_id"}
				rules={{
					required: {
						value: true,
						message: type === "track_access"
							? "Vous devez séléctioné une voiture"
							: "Vous devez séléctioné une location"
					}
				}}
				control={control}
				render={({ field: { onChange } }) => <>
					{type === "track_access" && <p className="add__label">Pour ajouter une voiture cliquer <Link href={"/my-account/cars/new"}>ici</Link></p>}
					{type === "track_access" && !cars.length
						? <div className="no__cars">
							<p>Vous n'avez pas encore ajouté de voiture !</p>
						</div>
						: <Dropdown
							items={type === "track_access" ? cars : locations}
							onChange={onChange}
							label={type === "track_access" ? "Votre voiture" : "Votre location"}
							keyExtractor={e =>
								type === "track_access"
									? "Marque: " + e.brand + ", Model: " + e.model
									: "Location: " + e.name
							}
						/>}
				</>}
			/>
		</div>
	</div>
}

export default DechargeForm;