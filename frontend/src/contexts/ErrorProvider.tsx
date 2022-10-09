import { ExclamationTriangleIcon, InformationCircleIcon, ShieldCheckIcon, ShieldExclamationIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { forwardRef, useEffect, useRef, useState } from "react"
import ErrorContext, {IError} from "./ErrorContext";

import {gsap} from "gsap"
import { useMediaQuery } from "usehooks-ts";

interface Props {
	children: React.ReactNode;
}

const TIME = 3000

const ErrorItem = forwardRef<HTMLDivElement, IError & {onClose: () => void}>(({ message, title, type, onClose }, ref) => {
	return <div className={"error__item " + type} ref={ref}>
		<div className="helper">
			{type === "danger" && <ShieldExclamationIcon />}
			{type === "warning" && <ExclamationTriangleIcon/>}
			{type === "success" && <ShieldCheckIcon/>}
			{type === "info" && <InformationCircleIcon/>}
			<div>
				<h4>{title}</h4>
				<p>{message}</p>
			</div>
		</div>
		<XMarkIcon onClick={onClose}/>
	</div>
})

const ErrorProvider: React.FC<Props> = ({ children }) => {

	const errorRef = useRef<HTMLDivElement>(null)
	const timeRef = useRef<any>(null)
	const [error, setError] = useState<IError | null>(null)

	const isMobile = useMediaQuery('(max-width: 782px)')

	const createError = (error: IError) => setError(error)

	const closeError = () => {
		if (!timeRef.current)
			return

		gsap.to(errorRef.current, {
			duration: 0.3,
			animation: "fadeOut",
			transform: "translateY(-100%)",
			onComplete: () => {
				if (timeRef.current)
					clearTimeout(timeRef.current)
				timeRef.current = null
				setError(null)
			}
		})
	}

	useEffect(() => {
		if (!error)
			return

		gsap.to(errorRef.current, {
			duration: 0.3,
			animation: "fadeIn",
			transform: isMobile ? "translateY(0)" : "translateY(20px)"
		})

		if (timeRef.current)
			clearTimeout(timeRef.current)
		timeRef.current = setTimeout(closeError, TIME)


	}, [error])

	return <ErrorContext.Provider value={{
		createError
	}}>
		{children}
		<div className="error__container">
			{error && <ErrorItem {...error} ref={errorRef} onClose={closeError}/>}
		</div>
	</ErrorContext.Provider>
}

export default ErrorProvider;