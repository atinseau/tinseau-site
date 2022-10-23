import { gsap } from "gsap"
import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "usehooks-ts"

interface Props {
	components: React.FC<{ next: () => void, back: () => void }>[],
	index: number,
	isSwitching: boolean,
	shouldAnimate?: boolean,
	setIsSwitching: (isSwitching: boolean) => void,
	props: any
}

interface SwitcherContextI {
	isMounted: boolean
}

const SwitcherContext = createContext<SwitcherContextI>({} as SwitcherContextI)

function ComponentSwitcher<T>({
	isSwitching,
	shouldAnimate,
	setIsSwitching,
	components,
	index,
	props
}: Props) {

	const [bufferIndex, setBufferIndex] = useState(index)

	const isMobile = useMediaQuery("(max-width: 782px)")
	const ref = useRef<HTMLDivElement>(null)
	const switchRef = useRef<HTMLDivElement>(null)

	const Component = components[bufferIndex]
	const NextComponent = components[index]

	// track if switcher is not animated
	useEffect(() => {
		if (shouldAnimate)
			return
		setBufferIndex(index)
	}, [shouldAnimate, index])

	useEffect(() => {

		if (!shouldAnimate || index < 0 || index > components.length || index == bufferIndex || isSwitching)
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
			duration: 0.5,
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

	return <SwitcherContext.Provider value={{
		isMounted: bufferIndex === index
	}}>
		<div className="component__switcher">
			{shouldAnimate ? <>
				<div ref={ref} key={bufferIndex}>
					<Component {...props} />
				</div>
				{index !== bufferIndex && <div className={"component__switch " + (index > bufferIndex ? "to_right" : "to_left")} ref={switchRef} key={"b"}>
					<NextComponent {...props} />
				</div>}
			</> : <div>
				<NextComponent {...props} />
			</div>}
		</div>
	</SwitcherContext.Provider>
}

const useSwitcherContext = () => useContext(SwitcherContext)

const useSwitcher = (initialState: number) => {
	const [isSwitching, setIsSwitching] = useState(false)
	const [index, setIndex] = useState(initialState)

	return {
		isSwitching,
		setIsSwitching,
		index,
		setIndex
	}
}

export {
	useSwitcherContext,
	useSwitcher
}

export default ComponentSwitcher;