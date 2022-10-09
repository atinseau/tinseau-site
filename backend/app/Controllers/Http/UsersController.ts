import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

import { schema, rules } from "@ioc:Adonis/Core/Validator"
import socket from 'App/Services/WebSocket'
import File from 'App/Models/File'

export default class UsersController {

	private async generateToken(ctx: HttpContextContract, user: User) {
		await Database.rawQuery(
			'DELETE FROM api_tokens WHERE user_id = ?',
			[user.id]
		)
		return ctx.auth.use('api').generate(user, {
			expiresIn: '30 minutes',
			name: "token"
		})
	}

	public async index() {
		return await User.query().preload('profil')
	}

	public async deleteAll() {
		return (await User.all()).map((user) => user.delete())
	}

	public async login(ctx: HttpContextContract) {

		const LoginSchema = schema.create({
			email: schema.string([rules.email()]),
			password: schema.string()
		})
		const body = await ctx.request.validate({ schema: LoginSchema })
		const user = await User.findBy('email', body.email)

		if (!user) {
			return ctx.response.notFound({
				message: "Aucun utilisateur trouvé avec cet email"
			})
		}

		if (!await user.verifyPassword(body.password))
			return ctx.response.forbidden({
				message: "Mot de passe incorrect"
			})

		return this.generateToken(ctx, user)
	}

	public async register(ctx: HttpContextContract) {

		const NewUserSchema = schema.create({
			email: schema.string({ trim: true }),
			password: schema.string({ trim: true }),
			username: schema.string({ trim: true })
		})

		const body = await ctx.request.validate({ schema: NewUserSchema })

		if (await User.findBy('email', body.email)) {
			return ctx.response.forbidden({
				message: "Un utilisateur existe déjà avec cet email"
			})
		}

		const user = await User.create({
			email: body.email,
			password: body.password,
			username: body.username
		})

		return this.generateToken(ctx, user)
	}

	public async google(ctx: HttpContextContract) {
		return {
			url: await ctx.ally.use('google').redirectUrl()
		}
	}


	public async googleCallback(ctx: HttpContextContract) {

		const google = ctx.ally.use('google')

		if (google.accessDenied()) {
			return 'Access was denied'
		}

		if (google.stateMisMatch()) {
			return 'Request expired. Retry again'
		}

		if (google.hasError()) {
			return google.getError()
		}

		const googleUser = await google.user()

		let user = await User.findBy('email', googleUser.email)

		if (!user) {
			user = await User.create({
				email: googleUser.email as string,
				username: googleUser.name
			})
		}

		if (!user.profil_id && googleUser.avatarUrl) {
			const image = await File.create({
				description: "Avatar de " + user.username,
				url: googleUser.avatarUrl as string,
				title: "Avatar",
				metadata: {
					drive: "external",
					type: "image"
				}
			})
			await user.related('profil').associate(image)
		}

		socket.io.emit('google:auth', await this.generateToken(ctx, user))
	}


	/**
	 * Authenticated user
	 */

	public async logout(ctx: HttpContextContract) {
		await ctx.auth.use('api').revoke()
		return {
			message: "Déconnecté"
		}
	}

	public async me(ctx: HttpContextContract) {
		const user = await User
			.query()
			.where('id', ctx.auth.user!.id)
			.preload('profil')
			.first()

		return user
	}
}
