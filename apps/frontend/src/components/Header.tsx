import React, { memo } from "react"
import Navbar from "./Navbar";

const Header: React.FC = () => {
	return <header>
		<Navbar/>
	</header>
}

export default memo(Header);