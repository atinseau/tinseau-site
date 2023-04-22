import React from "react"
import ReactPDF from '@react-pdf/renderer';
import Document from "./components/document"


async function stream2buffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
	return new Promise<Buffer>((resolve, reject) => {
		const _buf = Array<any>();
		stream.on("data", chunk => _buf.push(chunk));
		stream.on("end", () => resolve(Buffer.concat(_buf)));
		stream.on("error", err => reject(`error converting stream - ${err}`));
	});
}

const generate = async (builder: DechargeBuilder) => {
	return stream2buffer(await ReactPDF.renderToStream(<Document document={builder} />))
}

export {
	generate
}