import React from "react"
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import a from "public/images/carousel/a.jpeg"
import b from "public/images/carousel/b.jpeg"
import c from "public/images/carousel/c.jpeg"
import d from "public/images/carousel/d.jpeg"
import e from "public/images/carousel/e.jpeg"
import f from "public/images/carousel/f.jpeg"
import g from "public/images/carousel/g.jpeg"
import h from "public/images/carousel/h.jpeg"
import i from "public/images/carousel/i.jpeg"
import j from "public/images/carousel/j.jpeg"
import Image from "next/image";
import CarouselController from "./CarouselController";

const images = [a, b, c, d, e, f, g, h, i, j]

interface Props {
	title: string
}

const Carousel: React.FC<Props> = ({ title }) => {

	return <div className="carousel">
		<div className="carousel__header">
			<h3>{title}</h3>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor aperiam nesciunt ullam?</p>
		</div>

		<div className="carousel__container">
			<Swiper
				modules={[Autoplay]}
				spaceBetween={20}
				slidesPerView={2}
				autoplay={{
					disableOnInteraction: false,
					pauseOnMouseEnter: true
				}}
			>
				{images.map((image, key) => <SwiperSlide key={key}>
					<Image 
						src={image}
						alt="carousel"
					/>
				</SwiperSlide>)}
				<CarouselController />
			</Swiper>
		</div>
	</div>
}

export default Carousel;