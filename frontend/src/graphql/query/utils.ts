


const imageChunk = (key: string) => `
${key} {
	data {
		attributes {
			url
			alternativeText
			width
			height
		}
	}
}
`

const optionChunk = (key: string) => `
${key} {
	name
	price
	settings
}
`

export {
	imageChunk,
	optionChunk
}
