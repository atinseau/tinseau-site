import { useEffect, useState } from "react";
import { AuthMode } from "..";



const useModal = () => {
	const [modal, setModal] = useState<{ mode: AuthMode, open: boolean }>({ mode: "login", open: false })

	useEffect(() => {
		if (modal.open) {
			document.body.style.overflowY = "scroll"
			document.body.style.position = "fixed"
			document.body.style.width = "100%"
		}
		else document.body.removeAttribute("style")
	}, [modal])

	const toggleLoginModal = (mode: AuthMode) => setModal({ mode, open: !modal.open })

	return {
		toggleLoginModal,
		modal
	}
}

export default useModal;