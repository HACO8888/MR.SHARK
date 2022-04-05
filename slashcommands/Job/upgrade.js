const USERS = require(`${process.cwd()}/models/users`);
const MINE = require(`${process.cwd()}/models/mine`);
module.exports = {
  name: "upgrade",
  usage: "/upgrade [要升級的東西]",
  category: "職業",
  description: "所有職業升級指令",
  run: async (client, interaction) => {
		if(interaction.member.id !== '508964901415550976' && interaction.member.id !== '536445172247167016') {
			return interaction.reply("❌開發中...")
		} 
	}
}