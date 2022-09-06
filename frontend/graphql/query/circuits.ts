import { gql } from "@apollo/client";

const GET_CIRCUITS_WITH_EVENTS = gql`
query {
  circuits(filters: { events: { id: { ne: null } } }) {
    data {
      id
      attributes {
        title
        description
        events {
          data {
            id
            attributes {
              title
              date
              places
              classic {
                price
              }
            }
          }
        }
      }
    }
  }
}
`

export {
	GET_CIRCUITS_WITH_EVENTS 
}