import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CartsController {

	public async newSession(ctx: HttpContextContract) {
		const user = ctx.auth.user
		const orders = ctx.request.body() as OrderItem[]

		for (const order of orders) {
			
		}

		return "ok"
	}

}
