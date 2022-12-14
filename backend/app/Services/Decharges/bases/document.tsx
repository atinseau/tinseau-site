import React from "react"
import { Page, Document, Font, View, Text, Image } from '@react-pdf/renderer';
import Header from './components/Header';
import { styles, variables } from './variables';

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

	// test

	return (
		<Document>
			<Page size="A4" style={{ padding: 20 }}>
				<Header />
				<View>
					<Text style={{ color: variables.primaryColor, fontFamily: variables.primaryFont, textAlign: "center", marginTop: 50 }}>
						ATTESTATION DE RESPONSABILIT√© PERMANENTE ENGAGEMENT DE NON RECOURS POUR L'ANNEE {currentYear}
						JOURNEES CIRCUITS TINSEAUTESTDAYS {currentYear}
					</Text>
					<View style={{ fontSize: 10, marginTop: 20 }}>
						<Text style={styles.mb2}>Je soussign√©: {getKey(document.data, "fullname", "................................................................................................................................................................................")}</Text>

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
						<Text style={styles.mb8}>D√©clare √™tre tout √† fait conscient des risques engendr√©s par mon activit√© sur les circuits pour les journ√©es de roulage Tinseautestdays.</Text>
						<Text style={styles.mb8}>Acceptant les risques du roulage en route ferm√©, hors voie publique, je d√©gage en cons√©quence, soit comme conducteur, soit comme passager, soit comme spectateur ; le propri√©taire et l'exploitant des circuits ainsi que les organisateurs que sont la Eurl Challenge F1 de toutes responsabilit√©s, en cas d'accident de quelque nature qu'il soit, et renonce √† tout recours contre ceux cit√©s pr√©c√©demment. Assumant enti√®rement les √©ventuels p√©rils mat√©riels, corporels et immat√©riels que je pourrais subir du fait de ma pr√©sence sur les circuits.</Text>
						<Text style={styles.mb8}>En cas d'accident, sur les sites des journ√©es Tinseautestdays, avec un autre utilisateur, je m'engage √† r√©gler le sinistre directement avec lui. J'assume personnellement tous dommages que je pourrais occasionner sur les circuits des journ√©es Tinseautestdays que ce soit aux biens ou aux personnes.</Text>
						<Text style={styles.mb8}>Les propri√©taires des v√©hicules participant √† ces manifestations, font leur affaire personnelle de l'assurance de leur responsabilit√© civile vis √† vis des tiers.</Text>
						<Text style={styles.mb8}>Je d√©clare avoir pris connaissance du r√®glement et de ses consignes de s√©curit√© que je m'engage √† respecter. (Informations envoy√©s par mail 5 jours avant l'√©v√®nement). Je m'engage √† respecter les signalisations des circuits, feux ou drapeaux et √† en connaitre les significations, disponible sur le site internet www.tinseau.com et dans le stand r√©ceptif.</Text>
						<Text>Je d√©clare √™tre en totale sant√©, ne pas √™tre sujet aux maladies cardiaques ou toutes autres probl√®mes de sant√© m'interdisant les efforts physiques. Je d√©gage toutes responsabilit√©s l'organisateur, le circuit ou tous participants aux Tinseautestdays si je contracte le covid sur une des journ√©es 2022.</Text>
					</View>
					<View style={{ fontSize: 10, marginTop: 20 }}>
						<Text style={styles.mb2}>Je suis garantie aupr√®s de la compagnie d'assurance  {getKey(document.data?.car, "assurance_name", "..............................................................................................")}</Text>
						<Text style={styles.mb2}>Par la police N¬į {getKey(document.data?.car, "assurance_number", "......................................")} actuellement en cours de validit√© pour le circuit.</Text>
						<Text style={styles.mb2}>Permis de conduire N¬į {getKey(document.data, "license", "....................................................")}</Text>
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
