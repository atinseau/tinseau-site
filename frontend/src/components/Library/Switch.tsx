import { useEffect, useState } from "react";

interface Props {
	value: boolean,
	onChange: (value: boolean) => void
}

const Switch: React.FC<Props> = ({ onChange, value }) => {

	// const [checked, setChecked] = useState(value)

	// useEffect(() => {
	// 	onChange(checked)
	// }, [checked])

	// useEffect(() => {
	// 	setChecked(value)
	// }, [value])

	return <div className={"switch " + (value ? "checked": "")} onClick={() => onChange(!value)}/>
}

export default Switch;