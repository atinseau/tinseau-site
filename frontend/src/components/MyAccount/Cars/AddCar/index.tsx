import axios from "axios"
import React, { useRef, useState } from "react"

import { ChevronLeftIcon } from "@heroicons/react/24/solid"

import { Button, Input, Switch } from "src/components/Library"
import { getEnvConfig, headers } from "src/functions/getConfig"
import { Swiper, SwiperSlide } from "swiper/react"
import { Controller } from "react-hook-form";

import { useErrorContext, useErrorForm } from "src/hooks"

import 'swiper/css';

interface Props {
	next: () => void
	back: () => void
}

const AddCar: React.FC<Props> = ({ back }) => {

	const errorCtx = useErrorContext()

	const { register, handleSubmit, control } = useErrorForm("Impossible d'ajouter votre voiture")

	const [images, setImages] = useState<File[] | undefined>()
	const [allow, setAllow] = useState(false)

	const inputRef = useRef<HTMLInputElement>(null)

	const submit = async (e: any) => {
		const formData = new FormData()
		formData.append('data', JSON.stringify(e))
		if (images) {
			for (const image of images)
				formData.append('images', image)
		}
		axios.post(getEnvConfig().SERVER_API + "/users/cars/create", formData, headers())
			.then((res) => {
				console.log(res.data)
				back()
			})
			.catch((err) => {
				console.log(err)
				errorCtx.createError({
					title: "Impossible d'ajouter votre voiture",
					message: "Raison: " + (err?.response?.data?.error || "Une erreur est survenue"),
					type: "danger"
				})
			})
	}

	return <form className="cars new__one" onSubmit={handleSubmit(submit)}>
		<div className="cars__header">
			<h4>Ajout d'une nouvelle voiture</h4>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, doloribus aperiam voluptatem error iusto tempora. Aliquam labore necessitatibus rem unde modi maiores eum nobis perspiciatis fugit sit doloribus, accusantium delectus.
				Quos dignissimos, cum natus laborum saepe neque suscipit veritatis? Iste amet est error incidunt maiores hic voluptate, soluta deleniti, explicabo consequatur iure eligendi illum. Explicabo eaque mollitia autem veritatis praesentium!</p>
		</div>

		<div className="cars__container">
			<div className="cars__form">
				<div className="form__group">
					<h5>Marque</h5>
					<Input {...register("brand", { required: { value: true, message: "Veuillez renseigner la marque de votre voiture" } })} />
				</div>

				<div className="form__group">
					<h5>Model</h5>
					<Input {...register("model", { required: { value: true, message: "Veuillez entrer le model de votre voiture" } })} />
				</div>

				<div className="form__group">
					<h5>Immatriculation</h5>
					<Input {...register("registration", { required: { value: true, message: "Veuillez renseigner l'immatriculation de votre voiture" } })} />
				</div>

				<div className="form__group">
					<h5>Compagnie d'assurance</h5>
					<Input {...register("assurance_name", { required: { value: true, message: "Le nom de l'assurance de cette voiture est manquante" } })} />
				</div>


				<div className="form__group">
					<h5>Numéro contract assurance</h5>
					<Input {...register("assurance_number", { required: { value: true, message: "Le numéro de l'assurance de cette voiture est manquante" } })} />
				</div>
			</div>

			<div className="cars__images">
				<div className="upload">
					<h5>Photo(s) de votre voiture</h5>
					<input type="file" accept="image/*" ref={inputRef} multiple={true} onChange={(e) => {
						let files = images
						if (!files)
							files = []
						for (let i = 0; i < (e.target?.files || []).length; i++)
							files.push(e.target.files?.item(i) as File)
						setImages(files)
					}} />
					<Button onClick={() => inputRef.current?.click()}>Ajouter des photos</Button>
				</div>

				<div className="show">
					<Swiper
						slidesPerView={3}
						spaceBetween={30}
						direction="horizontal"
					>
						{images && images.map((image, i) => <SwiperSlide key={i}>
							<img src={URL.createObjectURL(image)} />
						</SwiperSlide>)}
					</Swiper>
				</div>

				<Controller
					name="allow_image_sharing"
					control={control}
					defaultValue={false}
					render={({ field: { onChange, value } }) => <>
						{images && <div className="allow">
							<p>Autoriser Tinseau.com à utiliser les photos de ma voiture pour enrichir les images du site ?</p>
							<Switch onChange={(e) => { console.log(e); onChange(e) }} value={value || false} />
						</div>}
					</>}
				/>
			</div>
		</div>

		<div className="cars__footer">
			<Button onClick={back}>
				<ChevronLeftIcon />
			</Button>
			<Button type="submit">Ajouter la voiture</Button>
		</div>
	</form>
}

export default AddCar;