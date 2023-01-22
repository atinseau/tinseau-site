import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form";
import useErrorContext from "./useErrorContext";

const useErrorForm = (title: string, defaultValue: { [key: string]: any } = {}) => {
	const { register, trigger, handleSubmit, control, formState, setValue, watch } = useForm({ defaultValues: defaultValue })
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

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			window.localStorage.setItem("form", JSON.stringify(value))
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	useEffect(() => {
		const data = JSON.parse(window.localStorage.getItem("form") || "{}")
		for (const key in data)
			setValue(key, data[key])
		return () => window.localStorage.removeItem("form")
	}, [])

	return {
		register,
		handleSubmit,
		control
	}
}

export default useErrorForm;