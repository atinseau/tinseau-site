import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import BaseModelWithUuid from 'App/Functions/BaseModelWithUuid'
import Car from './Car'
import Event from './Event'

export default class Location extends BaseModelWithUuid {
	@column({ isPrimary: true })
	public id: string

	@column()
	public instances_amount: number

	@column()
	public max_instances: number

	@column()
	public exclusive_price: number

	@column()
	public instance_price: number

	@column()
	public serie_format: SerieFormat

	@column({ serialize: (value) => JSON.parse(value) })
	public options: TTDOption[]

	@column()
	public event_id: string
	@belongsTo(() => Event, { foreignKey: "event_id" })
	public event: BelongsTo<typeof Event>


	@column()
	public car_id: string
	@belongsTo(() => Car, { foreignKey: "car_id" })
	public car: BelongsTo<typeof Car>
	
}
