import { useContext } from "react"
import OrderContext from "../contexts/OrderContext"


const useOrderContext = () => useContext(OrderContext)

export default useOrderContext;