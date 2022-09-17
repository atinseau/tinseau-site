import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import BaseModelWithUuid from 'App/Functions/BaseModelWithUuid'
import { jsonColumn } from 'App/Functions/jsonColumn'
import Event from './Event'

export default class TrackAccess extends BaseModelWithUuid {
	@column({ isPrimary: true })
	public id: string

	@column()
	public price: number

	@column()
	public places: number

	@jsonColumn()
	public options: TTDOption[]

	@column()
	public event_id: string
	@belongsTo(() => Event, { foreignKey: "event_id" })
	public event: BelongsTo<typeof Event>
}
