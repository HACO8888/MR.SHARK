const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: "server-list",
  usage: `/server-list`,
  category: "General",
  description: "機器人所在伺服器列表!",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const ServerList = [];
    client.guilds.cache.forEach(guild => {
      const sname = `${guild.name}(${guild.id})`
      ServerList.push(sname);
      });

    
    const Embed = new client.discord.MessageEmbed()
      .setTitle("機器人伺服器列表")
      .setDescription(ServerList.map((data) => `${data}`).join("\n"))
      .setColor(client.random_color())
      .setTimestamp(Date.now())
      .setFooter({
        text: client.config.embedfooterText,
        icon_url: client.user.avatarURL(),
      });
	interaction.followUp({ embeds: [Embed]});

  }
};