import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {


	Route.group(() => {
		Route.post('/register', "UsersController.register")
		Route.post('/login', "UsersController.login")
		Route.get('/google', "UsersController.google")
		Route.get('/google/callback', "UsersController.googleCallback")

		Route.group(() => {
			Route.get('/logout', "UsersController.logout")
			Route.get('/me', "UsersController.me")

			Route.group(() => {
				Route.get('/', "UserCarsController.myCars")
				Route.post('/create', "UserCarsController.create")
				Route.delete('/remove/:id', "UserCarsController.deleteOne")
			})
				.prefix('/cars')

			Route.group(() => {
				Route.post('/new-stock-session', 'CartsController.newStockSession')
				Route.get('/stock-session', 'CartsController.getStockSession')
				Route.get('/all-stock-session', 'CartsController.getAllStockSessions')
				Route.delete('/stock-session', 'CartsController.deleteStockSession')
			})
				.prefix('cart')

			Route.group(() => {
				Route.post('/download', 'DechargesController.downloadDecharge')
				Route.post('/create', 'DechargesController.createDecharge')
				Route.get('/', 'DechargesController.index')
			})
				.prefix('decharges')

		})
			.middleware('auth:api')


		// DEBUG
		Route.get('/all', "UsersController.all")
		Route.delete('/', "UsersController.deleteAll")

		Route.get('/decharges/all', 'DechargesController.all')
		Route.delete('/decharges/all', 'DechargesController.deleteAll')

		Route.get('/cars/all', "UserCarsController.all")
		Route.delete('/cars/all', "UserCarsController.deleteAll")

	})
		.prefix('users')

})
	.prefix('api/v1')