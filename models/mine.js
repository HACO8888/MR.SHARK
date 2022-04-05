const mongoose = require("mongoose");

const mine = mongoose.Schema({
	userID: String,
	Netherite_Pickaxe: Boolean,
	Diamond_Pickaxe: Boolean,
	Gold_Pickaxe: Boolean,
	Iron_Pickaxe: Boolean,
	Stone_Pickaxe: Boolean,
	Wood_Pickaxe: Boolean,
	Netherite_Ingot: Number,
	Emerald: Number,
	Diamond: Number,
	Lapis_Lazuli: Number,
	RedstoneDust: Number,
	Gold_Ingot: Number,
	Iron_Ingot: Number,
	Coal: Number,
	Cobblestone: Number,
	Wood: Number,
});

module.exports = mongoose.model("mine", mine);