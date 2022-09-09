
interface Props {
	value: boolean,
	setValue: (value: boolean) => void
}

const Switch: React.FC<Props> = ({ value, setValue }) => {
	return <div className={"switch " + (value ? "checked": "")} onClick={() => setValue(!value)}/>
}

export default Switch;