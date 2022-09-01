import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react"
import useDropdown from "../../../../../../hooks/useDropdown";
import Button from "../../../../../Library/Button";

interface SortMode {
	label: string
	value: string
}

interface Props {
	sortMode: SortMode,
	setSortMode: (sortMode: SortMode) => void
}

const sortModes: SortMode[] = [
	{
		label: "Par date",
		value: "date",
	},
	{
		label: "Par prix",
		value: "price",
	},
	{
		label: "Par popularité",
		value: "popularity",
	}
]

const CircuitSorting: React.FC<Props> = ({ sortMode, setSortMode }) => {

	const [isOpen, toggle, ref] = useDropdown<HTMLUListElement>()

	return <div className="circuit__sorting">
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

export { CircuitSorting, sortModes };