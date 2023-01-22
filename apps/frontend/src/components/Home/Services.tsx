import React from "react"
import Image from "next/image"
import coach from "public/images/coach.png"
import testdays from "public/images/testdays.jpeg"
import services from "public/images/services.jpeg"

const Services: React.FC = () => {
	return <div className="services">
		<div>
			<div className="services__header">
				<h2>Super dynamic design quality</h2>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore a quis numquam ipsum praesentium cupiditate quisquam, repellat at libero mollitia ratione beatae eius, veniam laboriosam amet id esse rem itaque.</p>
			</div>

			<div className="services__image__a">
				<Image src={coach} alt="coach"/>
			</div>

			<div className="services__image__b">
				<Image src={testdays} alt="coach"/>
			</div>

			<div className="services__footer">
				<h2>Wheel type a7g</h2>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, necessitatibus hic. Iure deleniti voluptatum reiciendis totam omnis amet quasi dignissimos qui ea molestiae.</p>
			</div>
		</div>

		<div>
			<hr/>

			<div className="last__services__header">
				<h2>Driving performance</h2>
				<h4>high performance</h4>
			</div>

			<Image src={services} alt="coach"/>

			<div className="last__services__footer">
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quaerat totam amet adipisci deleniti eligendi odit nam magni, cupiditate ad fugit dolore id earum aliquid repellendus optio at repellat consectetur.
				Alias itaque aliquid accusamus, beatae ex excepturi quas placeat expedita similique consequuntur esse quod! Harum sunt, magnam ducimus ea corporis illum velit reiciendis culpa doloremque nemo corrupti placeat, enim debitis?</p>
				<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione debitis eaque consequatur officia saepe animi praesentium adipisci deserunt soluta aspernatur amet perspiciatis expedita, cumque voluptas, ad odit reiciendis magnam! Beatae!</p>
			</div>
		</div>
	</div>
}

export default Services;