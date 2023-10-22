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


const downloadDecharge = async (type: DechargeType, id?: string) => {
	try {
		const res = await axios.post(getEnvConfig().SERVER_API + "/users/decharges/download" + (id ? "/" + id : ""), { type: type }, {
			headers: headers().headers,
			responseType: 'blob'
		})
		download(window.URL.createObjectURL(res.data), "decharge.pdf", "_blank")
	} catch (e) {
		console.log(e)
	}
}

export {
	download,
	downloadDecharge
}