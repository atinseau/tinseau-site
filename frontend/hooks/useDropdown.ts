import React, { useEffect, useState } from "react"
import gsap from "gsap"

type HTMLRef<T> = React.RefObject<T>
type ToggleFn = (e: React.MouseEvent | MouseEvent) => void
const DURATION = 0.5


const useDropdown = <T = HTMLDivElement>(): [
	boolean,
	ToggleFn,
	HTMLRef<T>
] => {

	const [isOpen, setOpen] = useState(false)
	const ref = React.useRef<T>(null)

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("click", toggle)
			gsap.to(ref.current as HTMLElement, {
				duration: DURATION,
				animation: "easeOut",
				height: "auto"
			})
		}
		else document.removeEventListener("click", toggle)
	}, [isOpen])

	const toggle: ToggleFn = (e) => {
		e.stopPropagation()
		if (!isOpen)
			setOpen(true)
		else {
			if (!ref.current)
				return
			gsap.to(ref.current, {
				duration: DURATION,
				animation: "easeOut",
				height: 0
			}).then(() => {
				setOpen(false)
			})
		}
	}

	return [isOpen, toggle, ref]
}

export default useDropdown;