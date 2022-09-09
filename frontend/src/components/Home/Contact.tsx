import React from "react"
import Button from "../Library/Button";

const Contact = () => {
	return <div className="contact">
		<h2>how are you interested in jaguar supercars</h2>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ad recusandae quas adipisci assumenda.</p>
		<div className="contact__button">
			<Button>Contact us</Button>
			<Button className="secondary">Send mail</Button>
		</div>
	</div>
}

export default Contact;