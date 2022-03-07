module.exports = {
  name: "report",
  usage: "/report <要回報的內容>",
  options: [
    {
      name: "內容",
      description: "要回報的內容",
      type: 3,
      required: true,
    },
  ],
  category: "一般",
  description: "回報機器人問題或是給予建議!",
  run: async (client, interaction) => {
		await interaction.deferReply({ ephemeral: false }).catch(() => {});
    const content = interaction.options.getString("內容");
    if (!content) {
      interaction.editReply("❌ | 回報失敗 | 原因:你沒有輸入要回報的內容");
      return;
    }
    const embed = new client.discord.MessageEmbed()
      .setTitle(`MR.SHARK 回報系統`)
      .addFields(
        {
          name: "回報人名稱",
          value: `${interaction.member.user.tag}`,
          inline: true,
        },
        { name: "回報人ID", value: `${interaction.member.id}`, inline: true },
        { name: "回報內容", value: `${content}`, inline: false },
        {
          name: "回報ID",
          value: `回報ID:${interaction.guild.id}${interaction.channel.id}${interaction.id}`,
          inline: false,
        }
      )
      .setColor(client.random_color())
      .setFooter({
        text: client.config.embedfooterText,
        iconURL: client.user.avatarURL(),
      });

    client.guilds.cache
      .get("773205132472877090")
      .channels.cache.get("949641073356058694")
      .send({ embeds: [embed] });
    client.guilds.cache
      .get(client.config.LogGuildId)
      .channels.cache.get(client.config.ReportLogChannelId)
      ?.send({ embeds: [embed] });
    interaction.editReply(
      `⭕ | 回報成功 | 回報ID:\`${interaction.guild.id}${interaction.channel.id}${interaction.id}\``
    );
    return;
  },
};
