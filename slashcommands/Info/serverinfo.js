module.exports = {
  name: "serverinfo",
  usage: "/erverinfo",
  category: "資訊",
  description: "查看機伺服器的一些資訊!",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
		await interaction.followUp("開發中...");
  },
};
