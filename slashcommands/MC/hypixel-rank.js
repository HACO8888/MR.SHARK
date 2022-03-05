module.exports = {
  name: "hypixel-rank",
  usage: "/hypixel-rank",
  category: "一般",
  description: "查看Hypixel資訊",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
		await interaction.followUp("開發中...");
  },
};
