const Wordle = require(`${process.cwd()}/wordle.js`);
module.exports = {
	name: 'wordleguess',
	aliases: ['wg'],
	category: '遊戲',
	description: "猜Wordle字",
	usage: `sh!wordleguess <五字單字>`,
	run: async (client, message) => {
		Wordle.PlayWordle(message);
	},
};