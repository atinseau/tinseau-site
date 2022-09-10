


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

export default imageChunk
