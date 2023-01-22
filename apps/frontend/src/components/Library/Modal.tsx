import React, { forwardRef, useEffect, useRef, useState } from "react"
import { gsap } from "gsap";
import { createPortal } from "react-dom";

interface Props {
	children: React.ReactNode
}

const Modal = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {

	return createPortal(<div className="modal" ref={ref}>
		<div className="modal__container">
			{children}
		</div>
	</div>, document.body)
})

const useModal = () => {

	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const toggle = () => {
		if (isOpen) {
			gsap.to(ref.current, {
				duration: 0.5,
				opacity: 0,
				backgroundColor: "rgba(0, 0, 0, 0)",
				animation: "ease-out",
				onComplete: () => setIsOpen(false)
			})
			return
		}
		setIsOpen(!isOpen)
	}

	useEffect(() => {
		if (isOpen) {
			const tl = gsap.timeline()
			tl.to(ref.current, {
				duration: 0.5,
				opacity: 1,
				backgroundColor: "rgba(0, 0, 0, 0.801)",
				animation: "ease-in"
			})
			tl.play()
		}
	}, [isOpen])

	return {
		isOpen,
		toggle,
		ref
	}
}

export {
	useModal
}

export default Modal;