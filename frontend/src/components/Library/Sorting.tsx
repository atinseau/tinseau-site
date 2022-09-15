import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react"
import useDropdown from "../../hooks/useDropdown";
import Button from "./Button";

interface Props {
	sortMode: SortMode | null,
	sortModes: SortMode[],
	setSortMode: (sortMode: SortMode) => void
	onSort?: (sortMode: SortMode) => void
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

const Sorting: React.FC<Props> = ({ sortModes, sortMode, setSortMode, onSort }) => {

	const [isOpen, toggle, ref] = useDropdown<HTMLUListElement>()

	useEffect(() => {
		sortMode && onSort && onSort(sortMode)
	}, [sortMode])

	return <div className="sorting">
		<p>Trier: </p>
		<Button onClick={toggle}>
			{sortMode?.label || "Par défaut"}
			<ChevronDownIcon />
		</Button>

		{isOpen && <ul ref={ref}>
			{[...sortModes, { label: "Par défaut", value: "default" }].map((mode, i) => <li key={i} onClick={() => setSortMode(mode)}>
				{mode.label}
			</li>)}
		</ul>}

	</div>
}

export default Sorting;