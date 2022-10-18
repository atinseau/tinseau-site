import { Sorting } from "src/components/Library";
import React, { useEffect, useMemo, useState } from "react"
import LocationCard from "./LocationCard";
import useOrderContext from "src/components/PickMyDay/hooks/useOrderContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Grid } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import useConfigContext from "src/components/PickMyDay/hooks/useConfigContext";
import { IOrderContext } from "src/components/PickMyDay/contexts/OrderContext";
import { useMediaQuery } from "usehooks-ts";

interface Props {
	next: () => void
	mounted: boolean
}

const LocationDesktop: React.FC<{ locations: TTDLocation[], ctx: IOrderContext, next: () => void }> = ({ locations, next, ctx }) => {
	return <Swiper
		breakpoints={{
			1440: {
				grid: {
					rows: 2
				}
			},
		}}
		spaceBetween={40}
		slidesPerView={"auto"}
		direction="vertical"
		className="swiper__container"
		pagination={{ clickable: true, el: ".swiper-pagination", type: "bullets" }}
		modules={[Pagination, Mousewheel, Grid]}
		freeMode={true}
		mousewheel={{
			releaseOnEdges: true,
		}}
	>
		{locations.map((location, i) => <SwiperSlide key={i}>
			<LocationCard
				onPick={(location) => ctx.addLocation(location) && next()}
				location={location}
			/>
		</SwiperSlide>)}
	</Swiper>
}

const LocationMobile: React.FC<{ locations: TTDLocation[], ctx: IOrderContext, next: () => void }> = ({ locations, next, ctx }) => {
	return <Swiper
		spaceBetween={40}
		slidesPerView={1}
		direction="horizontal"
		className="swiper__container"
		pagination={{ clickable: true, el: ".swiper-pagination", type: "bullets" }}
		modules={[Pagination, Mousewheel, Grid]}
		freeMode={true}
		mousewheel={{
			releaseOnEdges: true,
		}}
	>
		{locations.map((location, i) => <SwiperSlide key={i}>
			<LocationCard
				onPick={(location) => ctx.addLocation(location) && next()}
				location={location}
			/>
		</SwiperSlide>)}
	</Swiper>
}

const sortModes: SortMode[] = [
	{
		label: "Par prix",
		value: "price"
	}
]

const CarPicker: React.FC<Props> = ({ next, mounted }) => {

	const [sortMode, setSortMode] = useState<SortMode | null>(null)

	const ctx = useOrderContext()
	const configCtx = useConfigContext()

	const isDesktopOrMobile = useMediaQuery('(min-width: 782px)')

	const locations = useMemo(() => {
		const l = ctx.item?.event.locations || []
		switch (sortMode?.value) {
			case "price":
				const cloneL = structuredClone(l)
				return cloneL.sort((a, b) => a.instance_price - b.instance_price)
			default:
				return l
		}
	}, [ctx.item, sortMode])

	useEffect(() => {
		if (configCtx.isSwitching && mounted) {
			document.querySelector('.option__picker .swiper-pagination')?.remove()
		}
	}, [configCtx.isSwitching])

	useEffect(() => {
		if (mounted)
			return

		const container = document.querySelector('.option__picker')
		const pagination = document.createElement('div')
		pagination.classList.add('swiper-pagination')
		container?.appendChild(pagination)
	}, [])

	return <div className="car__picker">
		<div className="car__picker__header">
			<h3>Choissisez votre voiture</h3>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur odio quidem sequi ut, esse ipsum explicabo itaque sed eveniet repellat. Magnam asperiores sequi est cumque optio, quisquam earum nisi reprehenderit?</p>
		</div>

		<Sorting sortModes={sortModes} sortMode={sortMode} setSortMode={setSortMode} />

		<div className="car__container">
			{locations && <>
				{isDesktopOrMobile ?
					<LocationDesktop ctx={ctx} next={next} locations={locations} /> :
					<LocationMobile ctx={ctx} next={next} locations={locations} />
				}
			</>}
		</div>

	</div>
}

export default CarPicker;