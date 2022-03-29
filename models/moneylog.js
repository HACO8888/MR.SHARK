const mongoose = require("mongoose");

const wordle = mongoose.Schema({
	userID: String,//0
	Answer: String,//1
	Guess: [String],//4
	WinCount: Number,//6
	PlayCount: Number,//7
	GameStatus: Boolean,//8
	CanPlayNext: Boolean,//9
	Point: Number,
});

module.exports = mongoose.model("wordle", wordle);