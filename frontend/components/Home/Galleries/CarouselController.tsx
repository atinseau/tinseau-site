import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react"
import Button from "../../Library/Button";

import useActiveIndex from "./hooks/useActiveIndex";



const CarouselController: React.FC = () => {

	const { swiper, activeIndex, displayActiveIndex } = useActiveIndex()

	return <div className="controller">
		<div className="index__viewer">
			<h3>{displayActiveIndex}</h3>
			<div className="progress__bar">
				<div className="thumb" style={{
					width: (100 * (activeIndex + 1) / swiper.slides.length) + "%"
				}}/>
			</div>
		</div>
		<div className="buttons">
			<Button onClick={() => swiper.slidePrev()} className="left__button">
				<ChevronLeftIcon/>
			</Button>
			<Button onClick={() => swiper.slideNext()}>
				<ChevronRightIcon/>
			</Button>
		</div>
	</div>
}

export default CarouselController;