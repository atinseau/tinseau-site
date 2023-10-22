import React from "react"
import { Page, Document, Font, View, Text, Image } from '@react-pdf/renderer';
import Header from './Header';
import { styles, variables } from '../variables';

Font.register({ family: "Bebas Neue", src: "public/fonts/BebasNeue-Regular.ttf" })

interface Props {
	document: DechargeBuilder
}

const getKey = (data: any | undefined, key: string, defaultValue: string) => {
	if (data && data[key])
		return data[key]
	return defaultValue
}

// Create Document Component
const MyDocument: React.FC<Props> = ({ document }) => {
	const currentYear = new Date().getFullYear()
	return (
		<Document>
			<Page size="A4" style={{ padding: 20 }}>
				<Header />
				<View>
					<Text style={{ color: variables.primaryColor, fontFamily: variables.primaryFont, textAlign: "center", marginTop: 50 }}>
						ATTESTATION DE RESPONSABILITé PERMANENTE ENGAGEMENT DE NON RECOURS POUR L'ANNEE {currentYear}
						JOURNEES CIRCUITS TINSEAUTESTDAYS {currentYear}
					</Text>
					<View style={{ fontSize: 10, marginTop: 20 }}>

						<Text style={styles.mb2}>Je soussigné: {getKey(document.data, "fullname", "................................................................................................................................................................................")}</Text>

						<View style={[styles.mb2, { display: "flex", flexDirection: "row", marginTop: 10 }]}>
							<View style={[styles.flexCol, { flex: 1 }]}>
								<Text style={styles.mb2}>Adresse : {getKey(document.data, "address", "............................................................................")}</Text>
								<Text>Code Postal: {getKey(document.data, "postal", ".......................................................................")}</Text>
							</View>
							<View style={[styles.flexCol, { flex: 1 }]}>
								<Text style={styles.mb2}>Ville : {getKey(document.data, "city", ".........................................................................................")}</Text>
								<Text>Profession : {getKey(document.data, "jobs", "...............................................................................")}</Text>
							</View>
						</View>

						<View style={{ display: "flex", flexDirection: "row" }}>
							<View style={[styles.flexCol, { flex: 1 }]}>
								<Text style={styles.mb2}>Email :  {getKey(document.data, "email", "...............................................................................")}</Text>
							</View>
							<View style={[styles.flexCol, { flex: 1 }]}>
								<Text style={styles.mb2}>Tel. Portable : {getKey(document.data, "tel", "............................................................................")}</Text>
							</View>
						</View>


						<View style={{ marginTop: 8 }}>
							<Text style={{ fontFamily: variables.primaryFont, fontSize: 14, marginBottom: 6 }}>Votre voiture:</Text>
							<View style={{ display: "flex", flexDirection: "row" }}>
								<View style={[styles.flexCol, { flex: 1 }]}>
									<Text style={styles.mb2}>Marque : {getKey(document.data?.car, "brand", ".............................................................................")}</Text>
									<Text>Immatriculation: {getKey(document.data?.car, "registration", "..................................................................")}</Text>
								</View>
								<View style={[styles.flexCol, { flex: 1 }]}>
									<Text>Model : {getKey(document.data?.car, "model", ".....................................................................................")}</Text>
								</View>
							</View>
						</View>
					</View>
					<View style={{ fontSize: 10, marginTop: 20 }}>
						<Text style={styles.mb8}>Déclare être tout à fait conscient des risques engendrés par mon activité sur les circuits pour les journées de roulage Tinseautestdays.</Text>
						<Text style={styles.mb8}>Acceptant les risques du roulage en route fermé, hors voie publique, je dégage en conséquence, soit comme conducteur, soit comme passager, soit comme spectateur ; le propriétaire et l'exploitant des circuits ainsi que les organisateurs que sont la Eurl Challenge F1 de toutes responsabilités, en cas d'accident de quelque nature qu'il soit, et renonce à tout recours contre ceux cités précédemment. Assumant entièrement les éventuels périls matériels, corporels et immatériels que je pourrais subir du fait de ma présence sur les circuits.</Text>
						<Text style={styles.mb8}>En cas d'accident, sur les sites des journées Tinseautestdays, avec un autre utilisateur, je m'engage à régler le sinistre directement avec lui. J'assume personnellement tous dommages que je pourrais occasionner sur les circuits des journées Tinseautestdays que ce soit aux biens ou aux personnes.</Text>
						<Text style={styles.mb8}>Les propriétaires des véhicules participant à ces manifestations, font leur affaire personnelle de l'assurance de leur responsabilité civile vis à vis des tiers.</Text>
						<Text style={styles.mb8}>Je déclare avoir pris connaissance du règlement et de ses consignes de sécurité que je m'engage à respecter. (Informations envoyés par mail 5 jours avant l'évènement). Je m'engage à respecter les signalisations des circuits, feux ou drapeaux et à en connaitre les significations, disponible sur le site internet www.tinseau.com et dans le stand réceptif.</Text>
						<Text>Je déclare être en totale santé, ne pas être sujet aux maladies cardiaques ou toutes autres problèmes de santé m'interdisant les efforts physiques. Je dégage toutes responsabilités l'organisateur, le circuit ou tous participants aux Tinseautestdays si je contracte le covid sur une des journées 2022.</Text>
					</View>
					<View style={{ fontSize: 10, marginTop: 20 }}>
						<Text style={styles.mb2}>Je suis garantie auprès de la compagnie d'assurance  {getKey(document.data?.car, "assurance_name", "..............................................................................................")}</Text>
						<Text style={styles.mb2}>Par la police N° {getKey(document.data?.car, "assurance_number", "......................................")} actuellement en cours de validité pour le circuit.</Text>
						<Text style={styles.mb2}>Permis de conduire N° {getKey(document.data, "license", "....................................................")}</Text>
					</View>
					<View style={{ position: "relative", fontFamily: variables.primaryFont, marginTop: 30, marginLeft: 30 }}>
						<Text>Votre signature:</Text>
						{/* border: 2, borderColor: "black" */}
						{document.signature && <View style={{ width: 400, height: 65, left: 120, top: -25, position: "absolute" }}>
							<Image style={{ objectFit: "contain" }} src={document.signature} cache={false} />
						</View>}
					</View>
				</View>
			</Page>
		</Document>
	);
}

export default MyDocument;
