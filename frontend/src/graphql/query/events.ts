import { gql } from "@apollo/client";
import imageChunk from "./utils";

const EVENTS_CHUNK = `
events {
    data {
      id
      attributes {
        title
        date
        places
        locations {
          car {
            data {
              attributes {
                name
                ${imageChunk('images')}
              }
            }
          }
          exclusive_price
          serie_format
          serie_price
          available_series
        }
        classic {
          price
        }
      }
    }
  }
`


export {
	EVENTS_CHUNK
}