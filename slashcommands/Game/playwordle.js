const Wordle = require(`${process.cwd()}/slashwordle.js`);
module.exports = {
  name: "playwordle",
  usage: "/playwordle",
  category: "遊戲",
  description: "開始遊玩Wordle!",
  run: async (client, interaction) => {
		if(interaction.member.id !== '508964901415550976' && interaction.member.id !== '536445172247167016') {
			return interaction.reply("❌開發中...")
		} 
		Wordle.SlashLoadNewWordle(client, interaction);
  },
};
