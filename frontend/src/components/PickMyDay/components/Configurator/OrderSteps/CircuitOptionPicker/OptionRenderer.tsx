import { HiExclamation } from "react-icons/hi";
import React, { useEffect, useMemo } from "react"
import Incrementer from "src/components/Library/Incrementer";
import Switch from "src/components/Library/Switch";
import useOrderContext from "src/components/PickMyDay/hooks/useOrderContext";

interface Props {
	option: TTDOption
	type: OrderOptionType
	mounted: boolean
}

const OptionRendered: React.FC<Props> = ({ option, type, mounted }) => {

	const ctx = useOrderContext()

	const memoizedOption = useMemo(() => {
		let options: OrderOption[] = []
		if (type === "global") options = (ctx.item as OrderItem).order.options
		else if (type === "track_access") options = (ctx.item as OrderItem).order.track_access?.options || []
		else if (type === "location") options = ((ctx.item as OrderItem).order.locations || [])[ctx.currentLocationId].options
		return options.find((opt) => opt.name === option.name)
	}, [ctx.item])

	useEffect(() => {
		if (mounted || !ctx.item)
			return
		ctx.addOption({ name: option.name, type: option.settings.type, initalValue: option.settings.value }, type)
	}, [])


	return <li className={option.settings.type === "bool" && option.settings.value === "true" ? "disabled": ""}>
		<div>
			<h4>
				{option.dechargeable && <HiExclamation/>}
				{option.name} <span>{option.price}€</span>
				{option.settings.type === "bool" && option.settings.value === "true" ? <span>(inclus)</span> : null}
				{option.settings.type === "number" && parseInt(option.settings.value) ? <span>(x{option.settings.value} inclus)</span> : null}
			</h4>
			{option.settings.type === "number" && <Incrementer
				min={0}
				max={10}
				setCount={(i) => {
					if (!memoizedOption)
						return
					ctx.updateOption(memoizedOption, type, i)
				}}
				count={memoizedOption?.value || 0}
			/>}

			{option.settings.type === "bool" && <Switch
				value={memoizedOption?.value || false}
				onChange={(e) => {
					if (!memoizedOption || option.settings.value === "true")
						return
					ctx.updateOption(memoizedOption, type, e)
				}}
			/>}
		</div>
		<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas distinctio exercitationem veritatis voluptas incidunt eligendi rerum molestiae quasi numquam nobis sit.</p>
	</li>
}

export default OptionRendered;