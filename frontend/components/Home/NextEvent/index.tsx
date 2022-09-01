import React, { useEffect, useRef } from "react"
import { useIsMounted } from "usehooks-ts"
import EventCard from "./EventCard";
import Price from "./Price";
import Meta from "./Meta";

import Image from "next/future/image";
import mans from "../../../public/images/mans.jpeg"

const event = {
	title: "Journée du 18 septembre 2020",
	description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cupiditate, ut tenetur, accusantium ea id aliquam officiis eaque, veniam placeat quod ducimus fuga pariatur nemo quidem alias omnis quisquam. Maxime!"
}

const NextEvent: React.FC = () => {

	return <div className="next__event">
		<div className="next__event__title">
			<h1>Cicruit bugatti le mans</h1>
		</div>
		<EventCard event={event} />
		<Price />
		<Meta />
		<div className="next__event__image">
			<Image src={mans} />
		</div>
	</div>
}

export default NextEvent;