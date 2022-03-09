module.exports = {
  name: "reload",
  usage: "/reload",
  category: "開發",
  description: "重新讀取機器人!",
  run: async (client, interaction) => {
		if(!interaction.member.id === `536445172247167016` || !interaction.member.id === `508964901415550976`) return interaction.reply('You are not a Dev');  
		await interaction.reply("開發中...");
  },
};
