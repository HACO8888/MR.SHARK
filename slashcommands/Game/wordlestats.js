const Wordle = require(`${process.cwd()}/slashwordle.js`);
module.exports = {
  name: "wordlestats",
  usage: "/pwordlestats",
  category: "遊戲",
  description: "查看Wordle遊玩資料!",
  run: async (client, interaction) => {
		if(interaction.member.id !== '508964901415550976' && interaction.member.id !== '536445172247167016') {
			return interaction.reply("❌開發中...")
		} 
		Wordle.SlashShowWordleStats(client, interaction);
  },
};
