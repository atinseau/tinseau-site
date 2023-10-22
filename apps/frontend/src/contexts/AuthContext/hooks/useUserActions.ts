import axios from "axios"
import { useCallback, useState } from "react"
import { getEnvConfig, headers } from "src/functions/getConfig"
import { useErrorContext } from "src/hooks"


const useUserActions = (user: User | null) => {

	const errorCtx = useErrorContext()

	const [cars, setCars] = useState<UserCar[]>([])
	const [decharges, setDecharges] = useState<TTDDecharge[]>([])

	const fetchCar = useCallback(() => {
		axios.get(getEnvConfig().SERVER_API + "/users/cars", headers()).then((cars) => {
			setCars(cars.data)
		})
	}, [user])

	const fetchDecharges = useCallback(() => {
		axios.get(getEnvConfig().SERVER_API + "/users/decharges", headers())
			.then(({ data }) => {
				setDecharges(data)
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
			.catch(() => errorCtx.regularError())
	}, [cars])

	const removeDecharge = useCallback((id: string) => {
		axios.delete(getEnvConfig().SERVER_API + "/users/decharges/remove/" + id, headers())
			.then(() => {
				errorCtx.createError({
					title: "Décharge supprimée",
					message: "La décharge a bien été supprimée",
					type: "success",
				})
				fetchDecharges()
			})
			.catch(() => errorCtx.regularError())
	}, [decharges])

	return {
		carActions: {
			cars,
			setCars,
			fetch: fetchCar,
			remove: removeCar
		},

		dechargeActions: {
			decharges,
			setDecharges,
			fetch: fetchDecharges,
			remove: removeDecharge
		}
	}

}

export default useUserActions