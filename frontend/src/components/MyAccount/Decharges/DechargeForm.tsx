import type { UseFormRegister, FieldValues } from "react-hook-form";
import Input from "src/components/Library/Input";

interface Props {
	register: UseFormRegister<FieldValues>
}

const DechargeForm: React.FC<Props> = ({ register }) => {

	return <div className="decharges__form">
		<div className="form__group">
			<h5>Nom et prénom</h5>
			<Input placeholder="Nom et prénom" {...register('fullname', { required: { value: true, message: "Il faut un nom et un prénom" },  })} />
		</div>

		<div className="form__group">
			<h5>Adresse</h5>
			<Input placeholder="Adresse" {...register('address', { required:  { value: true, message: "Merci de fournir une adresse" } })} />
		</div>

		<div className="form__group">
			<h5>Code postal</h5>
			<Input placeholder="Code postal" {...register('postal', { required:  { value: true, message: "Merci de fournir votre code postal" } })} />
		</div>

		<div className="form__group">
			<h5>Email</h5>
			<Input placeholder="Email" {...register('email', { required:  { value: true, message: "Il faut renseigné un email" }, })} />
		</div>

		<div className="form__group">
			<h5>Tel. Portable</h5>
			<Input placeholder="Tel. Portable" {...register('tel', { required:  { value: true, message: "Il faut renseigné un numéro de téléphone" }, })} />
		</div>

		<div className="form__group">
			<h5>Ville</h5>
			<Input placeholder="Ville" {...register('city', { required:  { value: true, message: "Merci de renseigné votre ville" } })} />
		</div>

		<div className="form__group">
			<h5>Profession</h5>
			<Input placeholder="Profession" {...register('jobs', { required:  { value: true, message: "Votre profession est manqante" } })} />
		</div>

		<div className="form__group">
			<h5>Numéro de permis de conduire</h5>
			<Input placeholder="Numéro de permis de conduire" {...register('license', { required:  { value: true, message: "Vous n'avez pas entré de numéro de permis de conduire" } })} />
		</div>
	</div>
}

export default DechargeForm;