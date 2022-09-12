import React, { useCallback, useEffect, useMemo, useState } from "react"
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
		else if (type === "classic") options = (ctx.item as OrderItem).order.classic?.options || []

		return options.find((opt) => opt.name === option.name)
	}, [ctx.item])

	useEffect(() => {
		if (mounted || !ctx.item)
			return
		ctx.addOption({ name: option.name, type: option.settings.type }, type)
	}, [])

	return <li>
		<div>
			<h4>{option.name} <span>{option.price}€</span></h4>
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
				initalValue={memoizedOption?.value || false}
				onChange={(e) => {
					if (!memoizedOption)
						return
					ctx.updateOption(memoizedOption, type, e)
				}}
			/>}
		</div>
		<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas distinctio exercitationem veritatis voluptas incidunt eligendi rerum molestiae quasi numquam nobis sit.</p>
	</li>
}

export default OptionRendered;