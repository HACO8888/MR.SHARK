const mongoose = require("mongoose");
const USERS = require(`${process.cwd()}/models/users`)

module.exports = {
	name: 'marry',
	category: 'Marry',
	usage: `/marry <要結婚的人>`,
	description: "跟其他人結婚",
	options: [
		{
			name: "用戶",
			description: "請選擇要結婚的人",
			type: 6,
			required: false,
		}
	],
  run: async (client, interaction) => {
		if(interaction.member.id !== '508964901415550976' && interaction.member.id !== '536445172247167016' && interaction.channelId !== "950048724132974652") {
			return interaction.reply("❌開發中...")
		} 
	},
};