import { BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { BaseModelWithUuid } from 'App/Functions/ModelExtension'
import Event from './Event'
import File from './File'

export default class Circuit extends BaseModelWithUuid {

	@hasMany(() => Event, {
		foreignKey: "circuit_id"
	})
	public events: HasMany<typeof Event>

	@column()
	public name: string

	@column()
	public description: string

	@column({ serializeAs: null })
	public logo_id?: string
	
	@belongsTo(() => File, { foreignKey: "logo_id" })
	public logo: BelongsTo<typeof File>
}
