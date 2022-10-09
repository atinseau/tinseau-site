import React, { useState } from "react"
import ComponentSwitcher, { useSwitcher } from "src/components/Library/ComponentSwitcher"
import List from "./List"
import NewOne from "./NewOne"

interface Props {
	serverQuery: Object & {
		startBy?: string
	}
}


const Decharges: React.FC<Props> = ({ serverQuery }) => {

	const {
		isSwitching,
		index,
		setIsSwitching,
		setIndex
	} = useSwitcher(serverQuery.startBy === "new" ? 1 : 0)

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