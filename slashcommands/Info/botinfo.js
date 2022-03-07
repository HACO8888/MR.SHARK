module.exports = {
  name: "botinfo",
  usage: "/botinfo",
  category: "資訊",
  description: "查看機器人的一些資訊!",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
		await interaction.followUp("開發中...");
  },
};
