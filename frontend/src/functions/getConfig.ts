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


export {
	getEnvConfig
}