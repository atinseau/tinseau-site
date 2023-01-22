import React from "react";
import ComponentSwitcher, { useSwitcher } from "src/components/Library/ComponentSwitcher";
import AddCar from "./AddCar";
import List from "./List";


interface Props {
	serverParams: string[]
}

const Cars: React.FC<Props> = ({ serverParams }) => {

	const {
		isSwitching,
		index,
		setIsSwitching,
		setIndex
	} = useSwitcher(serverParams[0] === "new" ? 1 : 0)

	return <ComponentSwitcher
		basePath="/my-account/cars"
		components={[
			{
				component: List,
				path: "/"
			},
			{
				component: AddCar,
				path: "/new"
			}
		]}
		isSwitching={isSwitching}
		shouldAnimate={true}
		setIsSwitching={setIsSwitching}
		props={{
			next: () => setIndex(1),
			back: () => setIndex(0)
		}}
		index={index}
	/>
}

export default Cars;