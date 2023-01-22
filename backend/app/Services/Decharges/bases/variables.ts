
import { StyleSheet } from "@react-pdf/renderer";



// Create styles
const styles = StyleSheet.create({
	logoImage: {
		width: 40,
		height: 40,
		objectFit: "contain",
		marginRight: 10
	},

	mb1: { marginBottom: 3 },
	mb2: { marginBottom: 6 },
	mb3: { marginBottom: 9 },
	mb4: { marginBottom: 12 },
	mb5: { marginBottom: 15 },
	mb6: { marginBottom: 18 },
	mb7: { marginBottom: 21 },
	mb8: { marginBottom: 24 },

	flexRow: { display: "flex", flexDirection: "row" },
	flexCol: { display: "flex", flexDirection: "column" },
});

const variables = {
	primaryColor: "#ffd70c",
	secondColor: "#9ca3af",
	primaryFont: "Bebas Neue"
}

export {
	variables,
	styles
}