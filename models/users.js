const mongoose = require("mongoose");

const users = mongoose.Schema({
	userID: String,
	Money: [Number],
	level: [Number],
	item: [String],
	marry: String,
	premium: Boolean,
});

module.exports = mongoose.model("users", users);