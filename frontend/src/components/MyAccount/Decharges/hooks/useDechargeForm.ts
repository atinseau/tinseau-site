import React, { useEffect, useRef } from "react"
import { useForm } from "react-hook-form";

import useErrorContext from "src/hooks/useErrorContext";

const useDechargeForm = () => {
	const { register, trigger, handleSubmit, formState } = useForm()
	const isFirstSubmitted = useRef(false)
	const errorCtx = useErrorContext()

	
	useEffect(() => {
		; (async () => {
			if (formState.isSubmitting) {
				if (!isFirstSubmitted.current) {
					console.log("enable error")
					await trigger()
					isFirstSubmitted.current = true
				}
				for (const key of Object.keys(formState.errors)) {
					errorCtx.createError({
						title: "La décharge n'est pas complete",
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
		handleSubmit
	}
}

export default useDechargeForm;