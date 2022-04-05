const mongoose = require("mongoose");

const users = mongoose.Schema({
	userID: String,
	Money: [Number],
	level: [Number],
	item: [String],
	marry: String,
	premium: String,
	job: String,
});

module.exports = mongoose.model("users", users);