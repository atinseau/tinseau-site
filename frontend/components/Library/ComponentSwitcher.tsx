import useMounted from "hooks/useMounted"
import gsap from "gsap"
import React, { useEffect, useRef, useState } from "react"

interface Props<T> {
	components: React.FC<T>[],
	index: number,
	isSwitching: boolean,
	setIsSwitching: (isSwitching: boolean) => void,
	props: T
}

const ComponentSwitcher = <T extends Object>({ isSwitching, setIsSwitching, components, index, props }: Props<T>) => {

	const [bufferIndex, setBufferIndex] = useState(index)

	const ref = useRef<HTMLDivElement>(null)
	const switchRef = useRef<HTMLDivElement>(null)

	const Component = components[bufferIndex]
	const NextComponent = components[index]

	useEffect(() => {
		if (index == bufferIndex || isSwitching)
			return

		const tl = gsap.timeline()

		tl.to(ref.current, {
			...(index > bufferIndex ? {
				translateX: "-50%"
			}: {
				translateX: "+50%"
			}),
			duration: 0.5
		})

		tl.to(ref.current, {
			opacity: 0,
			duration: 0.5
		}, "-=0.4")

		tl.to(switchRef.current, {
			...(index > bufferIndex ? {
				left: 0
			}: {
				right: 0
			}),
			duration: 0.5
		}, "-=0.4")

		tl.eventCallback('onStart', () => setIsSwitching(true))
		tl.eventCallback('onComplete', () => {
			setBufferIndex(index)
			setIsSwitching(false)
		})
		tl.play()

	}, [index])

	return <div className="component__switcher">
		<div ref={ref} key={bufferIndex}>
			<Component {...props} />
		</div>

		{index !== bufferIndex && <div className={"component__switch " + (index > bufferIndex ? "to_right" : "to_left")} ref={switchRef}>
			<NextComponent {...props} />
		</div>}
	</div>
}

export default ComponentSwitcher;