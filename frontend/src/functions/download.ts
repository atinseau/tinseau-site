import axios from "axios"
import { getEnvConfig, headers } from "./getConfig"



const download = (url: string, name: string, mode?: string) => {
	const a = document.createElement('a')
	a.href = url
	if (mode === "_blank")
		a.target = "_blank"
	else
		a.download = name
	a.click()
}


const downloadDecharge = (type: DechargeType, id?: string) => {
	axios.post(getEnvConfig().SERVER_API + "/users/decharges/download" + (id ? "/" + id: ""), { type: type }, {
		headers: headers().headers,
		responseType: 'blob'
	})
		.then(async (e) => {
			download(window.URL.createObjectURL(e.data), "decharge.pdf", "_blank")
		})
}

export {
	download,
	downloadDecharge
}