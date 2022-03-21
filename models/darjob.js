const mongoose = require("mongoose");

const darjob = mongoose.Schema({
	userID: String,
	jobyet: String,
	whichjob: String
});

module.exports = mongoose.model("darjob", darjob);