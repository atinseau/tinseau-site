import { BaseModel, beforeCreate, column } from "@ioc:Adonis/Lucid/Orm"
import { v4 } from "uuid"


class BaseModelWithUuid extends BaseModel {
	@column({ isPrimary: true, })
	public id: string

	@beforeCreate()
	public static async generateUuid(model: BaseModelWithUuid) {
		model.id = v4()
	}
}


export {
	BaseModelWithUuid
}