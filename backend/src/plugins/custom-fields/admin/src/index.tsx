import pluginPkg from '../../package.json';
import OptionTypeField from "./components/OptionTypeField"

const name = pluginPkg.strapi.name;

export default {
	register(app) {
		app.addFields([
			{ type: "OptionTypeField", Component: OptionTypeField }
		])
	},
};
