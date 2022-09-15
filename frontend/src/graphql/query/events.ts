import { CAR_CHUNK } from "./car";
import { optionChunk } from "./utils";

const EVENTS_CHUNK = `
events {
	data {
		id
		attributes {
			title
			date
			places
			${optionChunk('global_options')}
			locations {
				${CAR_CHUNK}
				exclusive_price
				serie_format
				exclusive_series_count
				serie_price
				available_series
				${optionChunk('options')}
			}
			classic {
				${optionChunk("options")}
				price
			}
		}
	}
}
`


export {
	EVENTS_CHUNK
}