import React from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import { styles, variables } from '../variables';

import fs from "fs"
import path from "path"

const logo = fs.readFileSync(path.join(__dirname, ".." + '/images/logo.png'))

const Header = () => {
	return <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
		<View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
			<Image src={logo} style={styles.logoImage} />
			<View style={{ color: variables.primaryColor, fontFamily: variables.primaryFont }}>
				<Text style={{ fontSize: 28 }}>Tinseau</Text>
				<Text style={{ color: "black" }}>Test Days</Text>
			</View>
		</View>
		<View style={{ color: variables.secondColor, fontSize: 9, display: "flex", flexDirection: "column", width: "100%", textAlign: "right" }}>
			<Text style={{ color: "black", fontWeight: "extrabold", fontSize: 12, marginBottom: 8 }}>EURL Challenge F1</Text>
			<Text style={styles.mb1}>EURL au capital de 8000 €.</Text>
			<Text style={styles.mb1}>Représenté par Christophe Tinseau TINSEAU</Text>
			<Text style={styles.mb1}>264 rue Laennec 41350 Vineuil</Text>
			<Text style={styles.mb1}>Test Days Siret : 400 913 299 000 22 APE : 8551 Z</Text>
			<Text>No T.V.A.. Intercommunautaire FR 494.009.132.99.000.14</Text>
		</View>
	</View>
}

export default Header;