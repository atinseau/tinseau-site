import axios from "axios"
import { useCallback, useState } from "react"
import { getEnvConfig, headers } from "src/functions/getConfig"
import useErrorContext from "src/hooks/useErrorContext"


const useUserActions = (user: User | null) => {

	const errorCtx = useErrorContext()

	const [cars, setCars] = useState<UserCar[]>([])

	const fetchCar = useCallback(() => {
		axios.get(getEnvConfig().SERVER_API + "/users/cars", headers()).then((cars) => {
			setCars(cars.data)
		})
	}, [user])

	const removeCar = useCallback((id: string) => {
		axios.delete(getEnvConfig().SERVER_API + "/users/cars/remove/" + id, headers())
			.then(() => {
				errorCtx.createError({
					title: "Voiture supprimée",
					message: "La voiture a bien été supprimée",
					type: "success",
				})
				fetchCar()
			})
			.catch(() => {
				errorCtx.createError({
					title: "Erreur",
					message: "Une erreur est survenue",
					type: "danger",
				})
			})
	}, [cars])

	return {
		carActions: {
			cars,
			setCars,
			fetch: fetchCar,
			remove: removeCar
		}
	}

}

export default useUserActions