module.exports = {
  name: "reload",
  usage: "/reload",
  category: "開發",
  description: "重新讀取機器人!",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
		if(!interaction.member.id === `536445172247167016` || !nteraction.member.id === `508964901415550976`) return interaction.editReply('You are not a Dev');  
		await interaction.editReply("開發中...");
  },
};
