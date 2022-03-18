const Wordle = require(`${process.cwd()}/slashwordle.js`);
module.exports = {
  name: "wordlestats",
  usage: "/pwordlestats",
  category: "遊戲",
  description: "查看Wordle遊玩資料!",
  run: async (client, interaction) => {
		Wordle.SlashShowWordleStats(client, interaction);
  },
};
