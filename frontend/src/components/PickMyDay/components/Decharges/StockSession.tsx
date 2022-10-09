import { useRouter } from "next/router";
import { createPortal } from "react-dom";

import { MdTimer } from "react-icons/md"
import Counter from "src/components/Library/Counter";

interface Props {
	stockSession: StockSession
}

const StockSession: React.FC<Props> = ({ stockSession }) => {

	const router = useRouter()

	if (router.asPath.includes('/pick-my-day'))
		return null

	return createPortal(<div className="stock__session" onClick={() => router.push('/pick-my-day')}>
		<MdTimer />
		<div>
			<h3>Commande en cours</h3>
			<p><Counter endDate={stockSession.remainingTime}/></p>
		</div>
	</div>, document.body)
}

export default StockSession;