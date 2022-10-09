import { useRef, useState } from "react"
import {gsap} from "gsap"

const useConfiguratorAnimation = () => {

	const [isWelcome, setIsWelcome] = useState(true)
	const [isConfigurator, setIsConfigurator] = useState(false)
	const [isLast, setIsLast] = useState(false)

	const mainRef = useRef<HTMLDivElement>(null)
	const nextRef = useRef<HTMLDivElement>(null)


	const goToNext = () => {
		const tl = gsap.timeline()

		const current = mainRef.current 
		const target = nextRef.current

		tl.to(current, {
			translateX: "50%",
			duration: 0.5
		})

		tl.to(current, {
			opacity: 0,
			duration: 0.5
		}, "-=0.4")

		tl.to(target, {
			left: 20,
			duration: 0.5
		}, "-=0.4")

		tl.eventCallback("onComplete", () => {
			setIsWelcome(false)
			setIsConfigurator(true)
		})
		tl.play()
	}

	return {
		isWelcome,
		isConfigurator,
		isLast,
		goToNext,
		mainRef,
		nextRef
	}
}

export default useConfiguratorAnimation;