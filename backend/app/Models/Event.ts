import { BelongsTo, belongsTo, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { BaseModelWithUuid } from 'App/Functions/ModelExtension'
import { jsonColumn } from 'App/Functions/jsonColumn'
import Circuit from './Circuit'
import Location from './Location'
import TrackAccess from './TrackAccess'

export default class Event extends BaseModelWithUuid {

	@column({ isPrimary: true })
	public id: string

	@column()
	public title: string

	@column()
	public date: Date

	@column()
	public description: string

	@jsonColumn()
	public options: TTDOption[]

	@column()
	public circuit_id: string

	@belongsTo(() => Circuit, { foreignKey: "circuit_id" })
	public circuit: BelongsTo<typeof Circuit>

	@hasMany(() => Location, { foreignKey: "event_id" })
	public locations: HasMany<typeof Location>

	@hasOne(() => TrackAccess, { foreignKey: "event_id" })
	public track_access: HasOne<typeof TrackAccess>


}
