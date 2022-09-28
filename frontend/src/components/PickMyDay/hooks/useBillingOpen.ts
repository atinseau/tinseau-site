import { useEffect, useRef } from "react"
import gsap from "gsap"

const useBillingOpen = (close: () => void) => {

	const containerRef = useRef<HTMLDivElement>(null)
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {

		const tl = gsap.timeline()

		document.body.style.overflowY = "scroll"
		document.body.style.position = "fixed"
		document.body.style.width = "100%"

		tl.to(modalRef.current, {
			opacity: 1,
			duration: 0.5,
			animation: "ease-in-out"
		})

		tl.to(containerRef.current, {
			transform: "translateY(0)",
			duration: 0.5,
			animation: "ease-in-out"
		}, "-=0.3")

		tl.play()
	}, [])

	const handleClose = () => {
		gsap.to(modalRef.current, {
			opacity: 0,
			duration: 0.5,
			animation: "ease-in-out",
			onComplete: () => {
				document.body.removeAttribute("style")
				close()
			}
		})
	}

	return {
		containerRef,
		modalRef,
		handleClose
	}
}


export default useBillingOpen;