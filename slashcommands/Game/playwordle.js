const Wordle = require(`${process.cwd()}/slashwordle.js`);
module.exports = {
  name: "playwordle",
  usage: "/playwordle",
  category: "遊戲",
  description: "開始遊玩Wordle!",
  run: async (client, interaction) => {
		Wordle.SlashLoadNewWordle(client, interaction);
  },
};
