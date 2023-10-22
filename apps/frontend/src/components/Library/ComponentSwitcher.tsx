import { gsap } from "gsap"
import { useRouter } from "next/router"
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useMediaQuery } from "usehooks-ts"

type SwitcherComponent = React.FC<{ next: () => void, back: () => void }>
type SwitcherComponentWithPath = { component: SwitcherComponent, path: string }

interface Props {
	components: (SwitcherComponentWithPath | SwitcherComponent) [],
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

function ComponentSwitcher({
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

	const mainRef = useRef<HTMLDivElement>(null)

	const { Component, NextComponent } = useMemo(() => {
		
		let C = components[bufferIndex] 
		let NC = components[index]

		if (typeof (C as SwitcherComponentWithPath)?.path === "undefined") {
			C = {
				component: C as SwitcherComponent,
				path: ""
			}
		}

		if (typeof (NC as SwitcherComponentWithPath).path === "undefined") {
			NC = {
				component: NC as SwitcherComponent,
				path: ""
			}
		}

		return {
			Component: C,
			NextComponent: NC
		} as {
			Component: SwitcherComponentWithPath,
			NextComponent: SwitcherComponentWithPath
		}

	}, [bufferIndex, index])

	// track if switcher is not animated
	useEffect(() => {
		const query = router.asPath.split("?")[1]
		router.push(basePath + NextComponent.path + (query ? "?" + query : ""))
		if (shouldAnimate)
			return
		setBufferIndex(index)
	}, [shouldAnimate, index])

	useEffect(() => {
		if (!shouldAnimate || index < 0 || index > components.length || index == bufferIndex || isSwitching)
			return
		const tl = gsap.timeline()

		mainRef.current?.scroll({
			top: 0
		})

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
		<div className="component__switcher" ref={mainRef}>
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