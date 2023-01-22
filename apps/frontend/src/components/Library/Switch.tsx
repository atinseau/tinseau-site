
interface Props {
	value: boolean,
	onChange: (value: boolean) => void
}

const Switch: React.FC<Props> = ({ onChange, value }) => {
	return <div className={"switch " + (value ? "checked": "")} onClick={() => onChange(!value)}/>
}

export default Switch;