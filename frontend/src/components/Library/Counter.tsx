
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";


export type CounterRef = {isExpired: boolean}

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
		const min = Math.floor(diff / 1000 / 60)
		const sec = Math.floor(diff / 1000 % 60)
		spanRef.current!.innerHTML = `${min}m ${sec}s`
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