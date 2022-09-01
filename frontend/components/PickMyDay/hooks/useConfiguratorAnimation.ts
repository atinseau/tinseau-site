import React, { useRef, useState } from "react"
import gsap from "gsap"

const useConfiguratorAnimation = (defaultState: boolean) => {

	const [isWelcome, setIsWelcome] = useState(defaultState)
	const welcomeRef = useRef<HTMLDivElement>(null)
	const configuratorRef = useRef<HTMLDivElement>(null)

	const goToConfigurator = () => {
		const tl = gsap.timeline()

		tl.to(welcomeRef.current, {
			translateX: "50%",
			duration: 0.5
		})

		tl.to(welcomeRef.current, {
			opacity: 0,
			duration: 0.5
		}, "-=0.4")

		tl.to(configuratorRef.current, {
			left: 60,
			duration: 0.5
		}, "-=0.4")

		tl.eventCallback("onComplete", () => {
			setIsWelcome(false)
		})
		tl.play()
	}

	return {
		isWelcome,
		goToConfigurator,
		welcomeRef,
		configuratorRef
	}
}

export default useConfiguratorAnimation;