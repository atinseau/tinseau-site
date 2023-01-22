import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
	constructor(protected app: ApplicationContract) {
	}

	public register() {
		// Register your own bindings
	}

	public async boot() {
		// IoC container is ready
	}

	public async ready() {
		if (this.app.environment === "web") {
			const webSocket = (await import('App/Services/WebSocket')).default
			const stockTracker = (await import('App/Services/StockTracker')).default
			
			webSocket.boot()
			stockTracker.boot()
		}
	}

	public async shutdown() {
		// Cleanup, since app is going down
	}
}
