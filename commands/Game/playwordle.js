const Wordle = require(`${process.cwd()}/wordle.js`);
module.exports = {
	name: 'playwordle',
	aliases: ['pw'],
	category: '遊戲',
	description: "開始遊玩Wordle",
	usage: `sh!playwordle`,
	run: async (client, message) => {
		Wordle.LoadNewWordle(message);
	},
};