import Env from "@ioc:Adonis/Core/Env"
import schedule from "node-schedule"

class StockSession {
	public userId: string
	public items: OrderItem[]

	public trackers: Tracker[] = []
	public cronStarted: boolean = false

	private job: schedule.Job | null = null

	public addTracker(...trackers: Tracker[]) {
		this.trackers.push(...trackers)
	}

	public run(onComplete: () => void) {
		this.cronStarted = true

		const current = new Date()
		current.setMinutes(current.getMinutes() + Env.get('STOCK_TRACKER_DURATION'))

		this.job = schedule.scheduleJob(current, () => {
			console.log("execute tracker")
			this.stop()
			onComplete()
		})
	}

	public stop() {
		if (this.job && this.cronStarted) {
			this.job?.cancel()
			this.job = null
		}
	}

	public getRemainingTime() {
		return this.job?.nextInvocation() || new Date()
	}
}

class StockTracker {

	private stockSessions: StockSession[] = []
	private booted = false

	public boot() {
		if (this.booted)
			return
		console.log("StockTracker booted")
		this.booted = true
	}

	public newStockSession(userId: string, items: OrderItem[]) {

		if (this.getStockSession(userId))
			throw new Error("User already has a stock session")

		const stockSession = new StockSession()
		stockSession.userId = userId
		stockSession.items = items

		this.stockSessions.push(stockSession)
		return stockSession
	}

	public start() {
		for (const stockSession of this.stockSessions) {
			if (!stockSession.cronStarted)
				stockSession.run(() => this.removeStockSession(stockSession.userId))
		}
	}


	public getStockSession(userId?: string) {
		return this.stockSessions.find(stockSession => stockSession.userId === userId)
	}

	public getAllStockSessions() {
		return this.stockSessions
	}

	public removeStockSession(userId?: string) {
		if (!userId)
			throw new Error("User id is required")
		const stockSession = this.stockSessions.find(stockSession => stockSession.userId === userId)
		if (!stockSession)
			throw new Error("User doesn't have a stock session")
		stockSession.stop()
		this.stockSessions.splice(this.stockSessions.indexOf(stockSession), 1)
	}
}

export default new StockTracker()

