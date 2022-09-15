import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import React from "react"
import Button from "./Button";

interface Props {
	count: number
	setCount: (value: number) => void
	min?: number
	max?: number
	step?: number
}

const Incrementer: React.FC<Props> = ({ count, step = 1, setCount, max, min }) => {

	const inc = () => {
		if (typeof max !== "undefined" && count >= max)
			return
		setCount(count + step)
	}

	const dec = () => {
		if (typeof min !== "undefined" && count <= min)
			return
		setCount(count - step)
	}

	return <div className="incrementer">
		<Button onClick={dec} variant={count == min ? "disabled": "primary"}>
			<MinusIcon />
		</Button>
		<div className="result">
			<p>{count}</p>
		</div>
		<Button onClick={inc} variant={count == max ? "disabled": "primary"}>
			<PlusIcon />
		</Button>
	</div>
}

export default Incrementer;