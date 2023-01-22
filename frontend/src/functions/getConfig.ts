import Cookies from "js-cookie";
import getConfig from "next/config";

type EnvConfig = {
	SERVER_ADDRESS: string
	SERVER_API: string
}

function getEnvConfig(): EnvConfig {
	const config = getConfig()
	if (typeof window === "undefined")
		return config.serverRuntimeConfig;
	return config.publicRuntimeConfig;
}

const headers = () => {
	return {
		headers: {
			Authorization: "Bearer " + Cookies.get("token")
		}
	}
}

export {
	headers,
	getEnvConfig
}