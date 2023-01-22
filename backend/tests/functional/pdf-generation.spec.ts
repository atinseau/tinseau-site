import fs from "fs"

import { test } from '@japa/runner'
import { generate } from "App/Services/Decharges/bases"


test('Generating react pdf with signature', async () => {
	const buffer = await generate({
		type: "track_access",
		signature: fs.readFileSync("./signature.png"),
		skeleton: true
	})
	fs.writeFileSync("./test.pdf", buffer)
})