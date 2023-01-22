import { gsap } from "gsap"
import { useRouter } from "next/router"
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useMediaQuery } from "usehooks-ts"

interface Props {
	components: { component: React.FC<{ next: () => void, back: () => void }>, path: string }[],
	index: number,
	isSwitching: boolean,
	basePath: string,
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
	basePath,
	setIsSwitching,
	components,
	index,
	props
}: Props) {

	const [bufferIndex, setBufferIndex] = useState(index)

	const router = useRouter()

	const isMobile = useMediaQuery("(max-width: 782px)")
	const ref = useRef<HTMLDivElement>(null)
	const switchRef = useRef<HTMLDivElement>(null)

	const Component = components[bufferIndex]
	const NextComponent = components[index]

	// track if switcher is not animated
	useEffect(() => {
		router.push(basePath + NextComponent.path)
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
					<Component.component {...props} />
				</div>
				{index !== bufferIndex && <div className={"component__switch " + (index > bufferIndex ? "to_right" : "to_left")} ref={switchRef} key={"b"}>
					<NextComponent.component {...props} />
				</div>}
			</> : <div>
				<NextComponent.component {...props} />
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