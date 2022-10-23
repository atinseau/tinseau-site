import React from "react";
import ComponentSwitcher, { useSwitcher } from "src/components/Library/ComponentSwitcher";
import AddCar from "./AddCar";
import List from "./List";


interface Props {
	serverQuery: Object & {
		startBy?: string
	}
}

const Cars: React.FC<Props> = ({ serverQuery }) => {
	const {
		isSwitching,
		index,
		setIsSwitching,
		setIndex
	} = useSwitcher(serverQuery.startBy === "new" ? 1 : 0)

	return <ComponentSwitcher
		components={[List, AddCar]}
		isSwitching={isSwitching}
		setIsSwitching={setIsSwitching}
		props={{
			next: () => setIndex(1),
			back: () => setIndex(0)
		}}
		index={index}
	/>
}

export default Cars;