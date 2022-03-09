const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: "server-list",
  usage: `/server-list`,
  category: "開發",
  description: "機器人所在伺服器列表!",
  run: async (client, interaction) => {
		if(!interaction.member.id === `536445172247167016` || !interaction.member.id === `508964901415550976`) return interaction.reply('You are not a Dev');  
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
	interaction.reply({ embeds: [Embed]});

  }
};