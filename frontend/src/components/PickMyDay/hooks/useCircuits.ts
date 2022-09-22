
import React, { useEffect, useState } from "react"
import useAxios from "src/hooks/useAxios";

const useCircuits = (): [TTDCircuit[], React.Dispatch<React.SetStateAction<TTDCircuit[]>>] => {

	const [circuits, setCircuits] = useState<TTDCircuit[]>([])
	const { data, error, mutate } = useAxios<TTDCircuit[]>("http://192.168.1.36:3333/api/v1/circuits/events")

	useEffect(() => {
		if (!circuits.length && data)
			setCircuits(data)
	}, [data])

	return [circuits, setCircuits]
}

export default useCircuits;