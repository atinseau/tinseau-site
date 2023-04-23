import React, { memo } from "react"
import { Link } from "src/components/Library";

const Footer: React.FC = () => {
	return <footer>
		<p>Tinseau.com @1998-{new Date().getFullYear()} - All Rights Reserved.</p>
		<nav>
			<ul>
				<li>
					<Link href={"/"}>Home</Link>
				</li>

				<li>
					<Link href={"/about"}>About</Link>
				</li>

				<li>
					<Link href={"/contact"}>Contact</Link>
				</li>
			</ul>
		</nav>
	</footer>
}

export default memo(Footer);