import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react"
import useDropdown from "../../hooks/useDropdown";
import Button from "./Button";

interface Props {
	sortMode: SortMode,
	sortModes: SortMode[],
	setSortMode: (sortMode: SortMode) => void
}


export const defaultSortModes: SortMode[] = [
	{
		label: "Par date",
		value: "date",
	},
	{
		label: "Par prix",
		value: "price",
	}
]

const Sorting: React.FC<Props> = ({ sortModes, sortMode, setSortMode }) => {

	const [isOpen, toggle, ref] = useDropdown<HTMLUListElement>()

	return <div className="sorting">
		<p>Trier par: </p>
		<Button onClick={toggle}>
			{sortMode.label}
			<ChevronDownIcon />
		</Button>

		{isOpen && <ul ref={ref}>
			{sortModes.map((mode, i) => <li key={i} onClick={() => setSortMode(mode)}>
				{mode.label}
			</li>)}
		</ul>}

	</div>
}

export default Sorting;