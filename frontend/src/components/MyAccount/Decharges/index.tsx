import React, { useState } from "react"
import Button from "src/components/Library/Button"
import ComponentSwitcher from "src/components/Library/ComponentSwitcher"
import List from "./List"
import NewOne from "./NewOne"

interface Props {

}


const Decharges: React.FC<Props> = () => {

	const [isSwitching, setIsSwitching] = useState(false)
	const [index, setIndex] = useState(0)

	return <ComponentSwitcher
		components={[List, NewOne]}
		isSwitching={isSwitching}
		setIsSwitching={setIsSwitching}
		props={{
			next: () => setIndex(1),
			back: () => setIndex(0)
		}}
		index={index}
	/>

}

export default Decharges;