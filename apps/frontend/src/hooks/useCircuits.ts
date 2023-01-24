
import React, { useEffect, useState } from "react"
import { getEnvConfig } from "src/functions/getConfig";
import { useAxios } from "src/hooks";

const useCircuits = (withEvents: boolean = false): [TTDCircuit[], React.Dispatch<React.SetStateAction<TTDCircuit[]>>] => {

	const [circuits, setCircuits] = useState<TTDCircuit[]>([])
	const { data, error, mutate } = useAxios<TTDCircuit[]>(getEnvConfig().SERVER_API + "/circuits" + (withEvents ? "/events": ""))

	useEffect(() => {
		if (!circuits.length && data)
			setCircuits(data)
	}, [data])

	return [circuits, setCircuits]
}

export default useCircuits;

