import axios from "axios"
import { useCallback } from "react"
import { getEnvConfig, headers } from "src/functions/getConfig"


const useUserActions = (user: User | null) => {

	const getUserCars = useCallback(async () => {
		const cars: UserCar[] = []
		const { data } = await axios.get(getEnvConfig().SERVER_API + "/users/my-cars", headers())
		console.log(data)
		return cars
	}, [user])

	return {
		getUserCars
	}

}

export default useUserActions