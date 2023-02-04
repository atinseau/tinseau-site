import { TrashIcon } from "@heroicons/react/24/solid";
import { BiUndo } from "react-icons/bi"
import { forwardRef } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

interface Props {

}

const DechargeSignature = forwardRef<ReactSketchCanvasRef, Props>((props, ref) => {

	return <div className="decharges__signature">
		<div className="h">
			<h5>Votre signature</h5>
			<div className="signature__controller">
				<div className="undo">
					<BiUndo onClick={() => {
						const unwrapRef = ref as React.MutableRefObject<ReactSketchCanvasRef>
						unwrapRef.current.undo()
					}}/>
				</div>
				<div className="trash">
					<TrashIcon onClick={() => {
						const unwrapRef = ref as React.MutableRefObject<ReactSketchCanvasRef>
						unwrapRef.current.clearCanvas()
					}} />
				</div>
			</div>
		</div>

		<ReactSketchCanvas
			className="canvas"
			ref={ref}
			withTimestamp={true}
			strokeWidth={4}
			strokeColor="#FFD70C"
			canvasColor="#111827"
		/>
	</div>
})

export default DechargeSignature;