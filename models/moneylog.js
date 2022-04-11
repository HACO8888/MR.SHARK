const mongoose = require("mongoose");

const moneylog = mongoose.Schema({
	userID: String,
	log: [{ before: Number, after: Number, reason: String, user: Boolean, userid: String, time: String }]
});

module.exports = mongoose.model("moneylog", moneylog);