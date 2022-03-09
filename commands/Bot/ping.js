module.exports = {
  name: "ping",
  aliases: ["pong", "latency"],
  usage: "sh!ping",
  category: "一般",
  description: "查看機器人的延遲!",
  run: async (client, message, args) => {
    const msg = await message.channel.send(`🏓 Pinging...`);

    const pingEmbed = new client.discord.MessageEmbed()
      .setTitle(":signal_strength: 機器人延遲")
      .addField(
        "時間",
        `${Math.floor(msg.createdAt - message.createdAt)}ms`,
        true
      )
      .addField("API 延遲", `${client.ws.ping}ms`, true)
      .setColor(client.random_color())
      .setFooter({
        text: client.config.embedfooterText,
        iconURL: client.user.avatarURL(),
      });
    msg.delete();
    await message.reply({
      embeds: [pingEmbed],
      allowedMentions: { repliedUser: false },
    });
  },
};
