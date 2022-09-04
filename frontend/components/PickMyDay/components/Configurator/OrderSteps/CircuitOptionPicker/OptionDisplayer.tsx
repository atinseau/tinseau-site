import Incrementer from "components/Library/Incrementer"
import Switch from "components/Library/Switch"
import React, { useState } from "react"

interface Props {

}

const OptionDisplayer: React.FC<Props> = () => {

	const [count, setCount] = useState(0)
	const [value, setValue] = useState(false)

	return <ul>
		<li>
			<div>
				<h4>qsdqsdqsd <span>qsdqsdqsd€</span></h4>
				<Incrementer min={0} max={10} setCount={setCount} count={count} />
			</div>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas distinctio exercitationem veritatis voluptas incidunt eligendi rerum molestiae quasi numquam nobis sit.</p>
		</li>

		<li>
			<div>
				<h4>Coach <span>50€</span></h4>
				<Switch value={value} setValue={setValue} />
			</div>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas distinctio exercitationem veritatis voluptas incidunt eligendi rerum molestiae quasi numquam nobis sit.</p>
		</li>
	</ul>
}

export default OptionDisplayer;