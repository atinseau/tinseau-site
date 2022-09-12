import { useEffect, useState } from "react";

interface Props {
	initalValue: boolean,
	onChange: (value: boolean) => void
}

const Switch: React.FC<Props> = ({ onChange, initalValue = false }) => {

	const [checked, setChecked] = useState(initalValue)

	useEffect(() => {
		onChange(checked)
	}, [checked])

	return <div className={"switch " + (checked ? "checked": "")} onClick={() => setChecked(!checked)}/>
}

export default Switch;