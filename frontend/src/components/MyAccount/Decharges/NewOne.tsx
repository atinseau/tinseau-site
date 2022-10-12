import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useRef } from "react"

import Button from "src/components/Library/Button";
import { download } from "src/functions/download";
import { getEnvConfig, headers } from "src/functions/getConfig";

import DechargeForm from "./DechargeForm";
import DechargeSignature from "./DechargeSignature";
import DechargeTypeSelector from "./DechargeTypeSelector";

import type { ReactSketchCanvasRef } from "react-sketch-canvas";
import useErrorContext from "src/hooks/useErrorContext";
import useErrorForm from "src/hooks/useErrorForm";

interface Props {
	back: () => void
	next: () => void
	mounted: boolean
}

const NewOne: React.FC<Props> = ({ back, mounted }) => {

	const { register, handleSubmit, control } = useErrorForm("Impossible de créer la décharge")

	const errorCtx = useErrorContext()

	const canvasRef = useRef<ReactSketchCanvasRef>(null)

	const downloadDecharge = () => {
		axios.post(getEnvConfig().SERVER_API + "/users/decharges/download", { type: "track_access" }, {
			headers: headers().headers,
			responseType: 'blob'
		})
			.then(async (e) => {
				download(window.URL.createObjectURL(e.data), "decharge.pdf", "_blank")
			})
	}

	const submit = async (e: any) => {

		if (await canvasRef.current?.getSketchingTime() === 0) {
			errorCtx.createError({
				title: "Signature manquante",
				message: "Vous devez signer la décharge avant de continuer",
				type: "danger"
			})
			return
		}

		const svg = await canvasRef.current?.exportSvg()

		const body = {
			type: "track_access",
			signature: svg,
			data: e
		}

		axios.post(getEnvConfig().SERVER_API + "/users/decharges/create", body, headers())
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
			<DechargeTypeSelector />
			<DechargeForm register={register} control={control} mounted={mounted} />
			<DechargeSignature ref={canvasRef} />
		</div>

		<div className="decharges__footer">
			<Button onClick={back}>
				<ChevronLeftIcon />
			</Button>
			<div>
				<Button variant="secondary" onClick={downloadDecharge}>Consulter le document</Button>
				<Button type="submit">Crée la décharge</Button>
			</div>
		</div>
	</form>
}

export default NewOne;