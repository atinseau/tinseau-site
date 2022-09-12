import { imageChunk } from "./utils"


const CAR_CHUNK = `
car {
	data {
		id
		attributes {
			name
			description
			${imageChunk('images')}
		}
	}
}
`

export {
	CAR_CHUNK
}