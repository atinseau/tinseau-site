import React from "react"
import ComponentSwitcher, { useSwitcher } from "src/components/Library/ComponentSwitcher"
import List from "./List"
import NewOne from "./NewOne"

interface Props {
	serverParams: string[]
}


const Decharges: React.FC<Props> = ({ serverParams }) => {

	const {
		isSwitching,
		index,
		setIsSwitching,
		setIndex
	} = useSwitcher(serverParams[0] === "new" ? 1 : 0)

	return <ComponentSwitcher
		basePath="/my-account/responsability"
		components={[
			{
				component: List,
				path: "/"
			},
			{
				component: NewOne,
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

export default Decharges;