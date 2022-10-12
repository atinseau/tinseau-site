import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { getEnvConfig, headers } from "src/functions/getConfig"
import useAuthContext from "src/hooks/useAuthContext"



const useStockSession = (
	items: OrderItem[],
	setItems: ReactDispatch<OrderItem[]>,
	setCurrentItemId: ReactDispatch<number>,
	setOrderType: ReactDispatch<OrderType | null>,
) => {

	const authCtx = useAuthContext()

	const [stockSession, setStockSession] = useState<StockSession | undefined>()
	const [openDechargeDialog, setOpenDechargeDialog] = useState(false)
	const router = useRouter()

	const isStartSession = useRef(false)
	const firstLoad = useRef(true)

	const startStockSession = (onStart: () => void) => {
		axios.post<StockSession>(getEnvConfig().SERVER_API + "/users/cart/new-stock-session", { ttd: items }, headers())
			.then((e) => {
				isStartSession.current = true
				setStockSession(e.data)
				onStart()
			})
	}

	const deleteStockSession = () => {
		axios.delete(getEnvConfig().SERVER_API + "/users/cart/stock-session", headers()).then(() => {
			console.log("Stock session deleted")
		})
	}

	useEffect(() => {
		if (authCtx.user)
			return
		setStockSession(undefined)
	}, [authCtx.user])

	useEffect(() => {
		if (!authCtx.user)
			return

		axios.get<StockSession>(getEnvConfig().SERVER_API + "/users/cart/stock-session", headers())
			.then((e) => {
				setCurrentItemId(e.data.items.length - 1)
				setStockSession(e.data)
			})
			.catch((e) => {
				console.log(e.response.data)
			})
	}, [authCtx.user])

	useEffect(() => {
		if (!stockSession || isStartSession.current) return
		setItems(stockSession.items)
		setOrderType(stockSession.items[stockSession.items.length - 1].order.type)
		setOpenDechargeDialog(true)
	}, [router, stockSession])

	useEffect(() => {
		if (stockSession && firstLoad.current) {
			firstLoad.current = false
			const now = new Date()
			const date = new Date(stockSession.remainingTime)
			const timer = setTimeout(() => {
				setStockSession(undefined)
				setOpenDechargeDialog(false)
			}, date.getTime() - now.getTime())
			return () => clearTimeout(timer)
		}
	}, [stockSession])

	return {
		openDechargeDialog,
		stockSession,
		startStockSession,
		setOpenDechargeDialog,
		deleteStockSession
	}

}

export default useStockSession