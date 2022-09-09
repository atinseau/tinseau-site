import { useEffect, useMemo, useState } from "react"
import { useSwiper } from "swiper/react";
import { useIsMounted } from "usehooks-ts";

const formattedActiveIndex = (index: number) => index < 9 ? "0" + (index + 1) : index + 1


const useActiveIndex = () => {
	const swiper = useSwiper();
	const isMounted = useIsMounted()
	
	const [activeIndex, setActiveIndex] = useState<number>(swiper.activeIndex)

	useEffect(() => {
		if (!isMounted()) return
		swiper.on('slideChange', () => {
			setActiveIndex(swiper.activeIndex)
		})
	}, [isMounted()])

	const displayActiveIndex = useMemo(() => {
		return formattedActiveIndex(activeIndex)
	}, [activeIndex])

	return {
		activeIndex,
		displayActiveIndex,
		swiper, 
	}
}

export default useActiveIndex;