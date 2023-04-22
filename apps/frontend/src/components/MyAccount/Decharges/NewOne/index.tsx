import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react"

import Button from "src/components/Library/Button";
import { download, downloadDecharge } from "src/functions/download";
import { getEnvConfig, headers } from "src/functions/getConfig";

import DechargeForm from "./DechargeForm";
import DechargeSignature from "./DechargeSignature";
import DechargeTypeSelector from "./DechargeTypeSelector";

import type { ReactSketchCanvasRef } from "react-sketch-canvas";
import { useErrorContext, useErrorForm } from "src/hooks";

interface Props {
	back: () => void
	next: () => void
}

const NewOne: React.FC<Props> = ({ back }) => {

	const { register, handleSubmit, control } = useErrorForm("Impossible de créer la décharge")
	const errorCtx = useErrorContext()
	const canvasRef = useRef<ReactSketchCanvasRef>(null)

	const [type, setType] = useState<DechargeType>("track_access")

	const submit = async (e: any) => {

		if (type === "track_access" && e.car_id)
			e.car_id = e.car_id.id

		if (await canvasRef.current?.getSketchingTime() === 0) {
			errorCtx.createError({
				title: "Signature manquante",
				message: "Vous devez signer la décharge avant de continuer",
				type: "danger"
			})
			return
		}

		const svg = await canvasRef.current?.exportSvg()

		axios.post(getEnvConfig().SERVER_API + "/users/decharges/create", {
			type,
			signature: svg,
			data: e
		}, headers())
			.then((res) => {
				back()
			})
			.catch(() => {
				errorCtx.createError({
					title: "Erreur",
					message: "Une erreur est survenue lors de la création de la décharge",
					type: "danger"
				})
			})
	}

	return <form className="decharges new__one" onSubmit={handleSubmit(submit)}>
		<div className="decharges__header">
			<h4>Création d'une nouvelle décharge de responsabilité</h4>
			<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem quasi repellendus sunt explicabo id aliquid impedit beatae, nulla aliquam dicta nemo aperiam molestiae dolorem non temporibus quibusdam nobis. Tenetur, quidem?
				Repellendus ut possimus similique est ipsam quibusdam quisquam corporis ea reprehenderit deleniti, doloribus earum necessitatibus aperiam atque ducimus quaerat iure totam veniam inventore quo cum! A, ipsam? Quam, temporibus eum!</p>
		</div>

		<div className="decharges__container">
			<DechargeTypeSelector type={type} setType={setType} />
			<DechargeForm register={register} control={control} type={type} />
			<DechargeSignature ref={canvasRef} />
		</div>

		<div className="decharges__footer">
			<Button onClick={back}>
				<ChevronLeftIcon />
			</Button>
			<div>
				<Button variant="secondary" onClick={() => downloadDecharge(type)}>Consulter le document</Button>
				<Button type="submit">Crée la décharge</Button>
			</div>
		</div>
	</form>
}

export default NewOne;