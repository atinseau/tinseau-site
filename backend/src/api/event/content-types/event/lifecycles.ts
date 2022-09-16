
export default {
	beforeCreate(event) {
		console.log("Before create event", event);
	},

	beforeUpdate(event) {
		console.log("Before update event", event);
		event.params.data.places = 50;
	}
};