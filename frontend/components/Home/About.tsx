import React from "react"

const About: React.FC = () => {
	return <div className="about__video">

		<div className="about__video__description">
			<h2>Tinseau Test Days</h2>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis excepturi rerum provident quo beatae aliquam porro culpa eligendi nihil? Expedita magnam ratione veniam rerum recusandae quibusdam exercitationem quasi provident veritatis.
				Aspernatur nihil nostrum itaque sit hic. A modi officia recusandae atque corrupti? Deserunt optio molestias, aspernatur nihil magni non porro praesentium similique eius eum rem at. Voluptatibus vel accusantium harum!</p>
		</div>

		<div className="about__video__container">
			<div className="about__video__header">
				<h3>TINSEAU.COM</h3>
				<h3>video de promotion</h3>
			</div>

			<iframe src="https://www.youtube.com/embed/HRqIKIl34L4?controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
		</div>
	</div>

}

export default About;