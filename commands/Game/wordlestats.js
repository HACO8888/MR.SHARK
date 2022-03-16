const Wordle = require(`${process.cwd()}/wordle.js`);
module.exports = {
	name: 'wordlestats',
	aliases: ['ws'],
	category: '遊戲',
	description: "查看Wordle遊玩資料",
	usage: `sh!wordlestats`,
	run: async (client, message) => {
		Wordle.ShowWordleStats(message);
	},
};