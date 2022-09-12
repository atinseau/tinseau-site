import { gql } from "@apollo/client";
import { EVENTS_CHUNK } from "./events";
import { imageChunk } from "./utils";

const GET_CIRCUITS_WITH_EVENTS = gql`
query {
	circuits(filters: { events: { id: { ne: null } } }) {
		data {
			id
			attributes {
				title
				description
				${EVENTS_CHUNK}
				${imageChunk('logo')}
			}
		}
	}
}
`

export {
	GET_CIRCUITS_WITH_EVENTS
}