import { useRouter } from "next/router";
import { Button } from "src/components/Library";


const AllDechargesTypeForm = () => {

	const router = useRouter()

	return <div className="no__decharges">
		<h5>Vous n'avez aucune décharge de ce type</h5>
		<Button onClick={() => router.push('/my-account/responsability?startBy=new')}>Crée une décharge</Button>
	</div>
}

export default AllDechargesTypeForm;