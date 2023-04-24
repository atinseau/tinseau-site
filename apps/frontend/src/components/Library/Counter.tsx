'use client';

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";


export type CounterRef = { isExpired: boolean }

const Counter = forwardRef<CounterRef, { endDate: string }>(({ endDate }, ref) => {
	const spanRef = useRef<HTMLSpanElement>(null)
	const [isExpired, setIsExpired] = useState(false)
	const setRemainingTime = () => {
		const now = new Date()
		const end = new Date(endDate)
		const diff = end.getTime() - now.getTime()
		if (diff < 0) {
			setIsExpired(true)
			return
		}

		const hours = Math.floor(diff / (1000 * 60 * 60))
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((diff % (1000 * 60)) / 1000)

		if (hours > 0)
			spanRef.current!.innerText = `${hours}h ${minutes}m ${seconds}s`
		else
			spanRef.current!.innerHTML = `${minutes}m ${seconds}s`
	}

	useEffect(() => {
		setRemainingTime()
		const interval = setInterval(() => setRemainingTime(), 1000)
		return () => clearInterval(interval)
	}, [])

	useImperativeHandle(ref, () => ({
		isExpired
	}))

	return <span ref={spanRef} />
})

export default Counter;