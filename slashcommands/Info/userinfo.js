module.exports = {
  name: "userinfo",
  usage: "/userinfo [要查詢的使用者]",
  category: "資訊",
  description: "查看使用者的一些資訊!",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
		await interaction.followUp("開發中...");
  },
};
