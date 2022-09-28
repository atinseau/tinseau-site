import gsap from "gsap"
import React, { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "usehooks-ts"

interface Props<T> {
	components: React.FC<T & Object>[],
	index: number,
	isSwitching: boolean,
	setIsSwitching: (isSwitching: boolean) => void,
	props: T
}

const ComponentSwitcher = <T extends Object>({ isSwitching, setIsSwitching, components, index, props }: Props<T>) => {

	const [bufferIndex, setBufferIndex] = useState(index)

	const isMobile = useMediaQuery("(max-width: 782px)")
	const ref = useRef<HTMLDivElement>(null)
	const switchRef = useRef<HTMLDivElement>(null)

	const Component = components[bufferIndex]
	const NextComponent = components[index]

	useEffect(() => {
		if (index < 0 || index > components.length || index == bufferIndex || isSwitching)
			return

		const tl = gsap.timeline()

		tl.to(ref.current, {
			...(isMobile ? {
				height: switchRef.current?.scrollHeight,
			} : {}),
			...(index > bufferIndex ? {
				translateX: "-50%",
			} : {
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
			} : {
				right: 0
			}),
			duration: 0.5
		}, "-=0.4")



		tl.eventCallback('onStart', () => {
			setIsSwitching(true)
		})
		tl.eventCallback('onComplete', () => {
			setBufferIndex(index)
			setIsSwitching(false)
		})
		tl.play()

	}, [index])

	return <div className="component__switcher">
		<div ref={ref} key={bufferIndex}>
			<Component {...{ ...props, mounted: true }} />
		</div>

		{index !== bufferIndex && <div className={"component__switch " + (index > bufferIndex ? "to_right" : "to_left")} ref={switchRef} key={"b"}>
			<NextComponent {...{ ...props, mounted: false }} />
		</div>}
	</div>
}

export default ComponentSwitcher;