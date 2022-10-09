import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import StockTracker from 'App/Services/StockTracker'
import LocationsController from './LocationsController'



export default class CartsController {

	private async getTTDTracker(orderItems: OrderItem[]) {
		const trackers: Tracker[] = []
		for (const orderItem of orderItems) {
			const event = await Event.find(orderItem.event.id)
			if (!event)
				throw new Error("Un des événements n'existe pas")

			if (orderItem.order.type === "ttd") {
				trackers.push({
					type: "track_access",
					id: orderItem.event.track_access.id,
					hold: orderItem.order.track_access?.count || 0
				})
			} else if (orderItem.order.type === "location") {
				for (const locationItem of orderItem.order.locations || []) {
					const location = await LocationsController.getLocationByCarId(locationItem.car_id)
					trackers.push({
						type: "location",
						id: location.id,
						hold: locationItem.instance_amount
					})
				}
			}
			else
				throw new Error("Un des éléments du panier n'a pas de type valide")
		}
		return trackers
	}

	public async newStockSession(ctx: HttpContextContract) {
		const user = ctx.auth.user
		const cartPayload = ctx.request.body() as CartPayload

		try {
			const stockSession = StockTracker.newStockSession(user!.id, cartPayload.ttd)
			stockSession.addTracker(...await this.getTTDTracker(cartPayload.ttd))
			StockTracker.start()
		} catch (error) {
			return ctx.response.badRequest({
				message: error.message
			})
		}
		return this.getStockSession(ctx)
	}

	public getStockSession(ctx: HttpContextContract) {
		const user = ctx.auth.user
		const stockSession = StockTracker.getStockSession(user?.id)

		if (!stockSession) {
			ctx.response.forbidden({
				message: "Vous n'avez pas de session de stock"
			})
			return
		}
		return {
			remainingTime: stockSession.getRemainingTime(),
			trackers: stockSession.trackers,
			items: stockSession.items
		}
	}

	public getAllStockSessions() {
		return StockTracker.getAllStockSessions()
	}

	public deleteStockSession(ctx: HttpContextContract) {
		const user = ctx.auth.user

		try {
			StockTracker.removeStockSession(user?.id)
		} catch (e) {
			return ctx.response.forbidden({
				message: e.message
			})
		}
		return {
			message: "Session supprimée"
		}
	}

}
