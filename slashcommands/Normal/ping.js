module.exports = {
  name: "ping",
  usage: "/ping",
  category: "一般",
  description: "查看機器人的延遲!",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    const msg = await interaction.channel.send(`🏓 偵測中...`);

    const pingEmbed = new client.discord.MessageEmbed()
      .setTitle(":signal_strength: 機器人延遲")
      .addField(
        "時間",
        `${Math.floor(msg.createdAt - interaction.createdAt)}ms`,
        true
      )
      .addField("API 延遲", `${client.ws.ping}(ms)`, true)
      .setColor(client.random_color())
      .setFooter({
        text: client.config.embedfooterText,
        icon_url: client.user.avatarURL(),
      });
    msg.delete();
    await interaction.followUp({ embeds: [pingEmbed] });
  },
};
