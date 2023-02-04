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

	const locations = useMemo(() => {
		if (!orderCtx.stockSession || type !== "location")
			return []
		return orderCtx.stockSession.items.filter(e => e.order.type === "location").map((e) => {
			const carInEvent = e.event.locations.map((l) => l.car).filter((car) => {
				return true
			})
			return carInEvent
		}).reduce((acc, curr) => [...acc, ...curr], [])
	}, [orderCtx.stockSession, type])

	useEffect(() => {
		if (!switcherCtx.isMounted)
			return
		fetch()
	}, [])

	useEffect(() => {
		console.log(locations)
	}, [locations])

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

		{type !== "additionnal_driver" && <div className="form__group dropdown__cars">
			<h5>Séléctionner votre {type === "track_access" ? "voiture" : "location"}</h5>
			<Controller
				name="car_id"
				rules={{ required: { value: true, message: "Vous devez séléctioné une voiture" } }}
				control={control}
				render={({ field: { onChange } }) => <>
					{type === "track_access" && <p className="add__label">Pour ajouter une voiture cliquer <Link href={"/my-account/cars?startBy=new"}>ici</Link></p>}
					{!cars.length
						? <div className="no__cars">
							<p>Vous n'avez pas encore ajouté de voiture !</p>
						</div>
						: <Dropdown
							items={type === "track_access" ? cars : locations}
							onChange={onChange}
							label={type === "track_access" ? "Votre voiture" : "Votre location"}
							keyExtractor={e => type === "track_access"
								? "Marque: " + e.brand + ", Model: " + e.model
								: "Location: " + e.name
							}
						/>}
				</>}
			/>
		</div>}
	</div>
}

export default DechargeForm;