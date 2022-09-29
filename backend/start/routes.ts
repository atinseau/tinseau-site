/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/sign/callback', 'DechargesController.signCallback')

Route.group(() => {

	Route.group(() => {
		Route.get('/', "UsersController.index")
		Route.post('/register', "UsersController.register")
		Route.post('/login', "UsersController.login")
		Route.get('/google', "UsersController.google")
		Route.get('/google/callback', "UsersController.googleCallback")

		Route.delete('/', "UsersController.deleteAll")

		Route.group(() => {
			Route.get('/logout', "UsersController.logout")
			Route.get('/me', "UsersController.me")

			Route.group(() => {
				Route.post('/new-session', 'CartsController.newSession')
			}).prefix('cart')

		}).middleware('auth:api')

	}).prefix('users')

	Route.group(() => {
		Route.get('/', 'CircuitsController.index')
		Route.get('/events', 'CircuitsController.events')
		Route.post('/create', 'CircuitsController.create')
		Route.delete('/', 'CircuitsController.deleteAll')
		Route.put('/:id', 'CircuitsController.update')
	}).prefix('circuits')

	Route.group(() => {
		Route.get('/', 'EventsController.index')
		Route.put('/:id', 'EventsController.update')
		Route.post('/create', 'EventsController.create')
		Route.delete('/', 'EventsController.deleteAll')

		Route.get('/tracks-accesses', 'EventsController.trackAccesses')
		Route.delete('/tracks-accesses', 'EventsController.trackAccessDelete')

	}).prefix('events')

	Route.group(() => {
		Route.get('/', 'LocationsController.index')
		Route.delete('/', 'LocationsController.deleteAll')
	}).prefix('locations')

	Route.group(() => {
		Route.get('/', 'CarsController.index')
		Route.post('/create', 'CarsController.create')
		Route.delete('/', 'CarsController.deleteAll')
		Route.put('/:id', "CarsController.update")
	}).prefix('cars')

	Route.group(() => {
		Route.get('/', 'ImagesController.index')
		Route.post('/create', 'ImagesController.create')
		Route.delete('/', 'ImagesController.deleteAll')
	}).prefix('images')

}).prefix('api/v1')
