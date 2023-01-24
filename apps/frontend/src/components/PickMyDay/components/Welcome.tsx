import React, { useEffect } from "react"
import { Button } from "src/components/Library";
import { useOrderContext } from "src/hooks";

interface Props {
	goToNext: () => void
}

const Welcome = React.forwardRef<HTMLDivElement, Props>((props, ref) => {

	const ctx = useOrderContext()

	useEffect(() => {
		if (ctx.orderType)
			props.goToNext()
	}, [ctx.orderType])

	useEffect(() => {
		console.log(ctx.circuits)
	}, [ctx.circuits])

	return <div className="welcome" ref={ref}>
		<div className="side__left">
			<h1>Journée sur mesure</h1>
			<div>
				<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis quae praesentium quaerat laboriosam aliquid nam vitae repellendus quas, magnam perspiciatis. Eaque laboriosam aspernatur dolore atque praesentium, perspiciatis blanditiis magnam voluptate.</p>

				<h3>Options disponibles:</h3>

				<ul>
					<li>Le circuit qui vous interesse (date, lieu)</li>
					<li>Le nombre d'accompagnateur</li>
					<li>Le nombre de repas</li>
					<li>Le nombre d'accés piste</li>
					<li>Le nombre de pilote supplementaire</li>
					<li>Coach à disposition</li>
					<li>Coach dédié</li>
					<li>Accés openbar</li>
				</ul>
			</div>

			{ctx.circuits && ctx.circuits.length ? <div>
				<Button onClick={() => ctx.setOrderType("ttd")}>J'ai déjà une voiture !</Button>
				<Button onClick={() => ctx.setOrderType("location")}>Louer une voiture !</Button>
			</div>: <div>
				<Button className="disabled">Il n'y a pas de circuit disponible pour le moment</Button>
			</div>}
		</div>
		<div className="side__right">
			<video muted autoPlay loop className="video">
				<source src="/videos/getmyday.mp4" type="video/mp4" />
			</video>
		</div>
	</div>
})

export default Welcome;