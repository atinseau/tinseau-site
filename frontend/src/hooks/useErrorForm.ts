import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form";
import useErrorContext from "./useErrorContext";

const useErrorForm = (title: string) => {
	const { register, trigger, handleSubmit, control, formState } = useForm()
	const isFirstSubmitted = useRef(false)
	const errorCtx = useErrorContext()
	
	useEffect(() => {
		; (async () => {
			if (formState.isSubmitting) {
				if (!isFirstSubmitted.current) {
					await trigger()
					isFirstSubmitted.current = true
				}
				for (const key of Object.keys(formState.errors)) {
					errorCtx.createError({
						title: title,
						message: formState.errors[key]?.message?.toString() || "Une erreur est survenue",
						type: "danger"
					})
					return
				}
			}
		})()
	}, [formState])

	return {
		register,
		handleSubmit,
		control
	}
}

export default useErrorForm;