const mongoose = require("mongoose");

module.exports = async (client) => {
	mongoose.connect(process.env['DB'], {
	  useNewUrlParser: true,
	  useUnifiedTopology: true},(err) => {
	  if (err) return console.error(err);
	  client.log("MongoDB Connect Successed", "\x1B[1;34m")
	})
};
