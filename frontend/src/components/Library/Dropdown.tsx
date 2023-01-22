import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { classNames } from "src/functions/utils";
import { useDropdown } from "src/hooks";


interface Props<T> {
	className?: string
	label: string
	items: T[],
	keyExtractor?: (item: T) => string
	onChange?: (item: T) => void
	onBlur?: () => void
}

const Dropdown = <T extends unknown>({
	className,
	label,
	items,
	keyExtractor,
	onChange,
	onBlur
}: Props<T>): React.ReactElement<Props<T>> => {

	const [open, toggle, ref] = useDropdown<HTMLUListElement>()
	const [selected, setSelected] = useState<T | undefined>()

	const unwrap = (item: T | undefined) => {
		return typeof item === "string" ?
			item :
			item ?
				(keyExtractor ?
					keyExtractor(item) :
					JSON.stringify(item)
				) :
				"(null)"
	}

	useEffect(() => {
		if (!selected) return
		onChange?.(selected)
	}, [selected])

	return <div
		className={classNames("dropdown", className, open ? "open" : null)}
		onClick={toggle}
		onBlur={onBlur}
	>
		<p>{selected ? unwrap(selected) : label}</p>
		<ChevronDownIcon />
		{open && <ul ref={ref}>
			{items.map((e, i) => <li key={i} onClick={() => setSelected(e)}>
				{unwrap(e)}
			</li>)}
		</ul>}
	</div>
}

export default Dropdown;