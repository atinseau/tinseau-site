import ComponentSwitcher, { useSwitcher } from "src/components/Library/ComponentSwitcher";
import AddCar from "./AddCar";
import List from "./List";


const Cars = () => {
	const {
		isSwitching,
		index,
		setIsSwitching,
		setIndex
	} = useSwitcher(0)

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