const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: "serverlist",
  usage: `/serverlist`,
  category: "開發",
  description: "機器人所在伺服器列表!",
  run: async (client, interaction) => {
			if(interaction.member.id !== '508964901415550976' && interaction.member.id !== '536445172247167016') {
				return interaction.reply("❌你不是開發人員")
			}
    const ServerList = [];
    client.guilds.cache.forEach(guild => {
      const sname = `${guild.name}(${guild.id})`
      ServerList.push(sname);
      });

    
    const Embed = new client.discord.MessageEmbed()
      .setTitle("機器人伺服器列表")
      .setDescription(ServerList.map((data) => `${data}`).join("\n"))
      .setColor(client.random_color())
      .setTimestamp()
      .setFooter({
        text: client.config.embedfooterText,
        iconURL: client.user.avatarURL(),
      });
	interaction.reply({ embeds: [Embed]});

  }
};