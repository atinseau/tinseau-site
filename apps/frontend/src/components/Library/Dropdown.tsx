'use client';

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { classNames } from "src/functions/utils";
import { useDropdown } from "src/hooks";

type Unarray<T> = T extends Array<infer U> ? U : T;
type UnionToIntersection<U> = 
  (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never

interface Props<T> {
	className?: string
	label: string
	items: T extends { length: number } ? T: never,
	keyExtractor?: (item: UnionToIntersection<Unarray<T>>) => string
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
					keyExtractor(item as any) :
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
			{(items as Array<any>).map((e, i) => <li key={i} onClick={() => setSelected(e)}>
				{unwrap(e)}
			</li>)}
		</ul>}
	</div>
}

export default Dropdown;