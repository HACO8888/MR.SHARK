module.exports = {
  name: "guildDelete",
  async execute(client, guild) {
	const owner = guild.members.cache.get(guild.ownerId)
	const fetchedChannel = await client.channels.fetch(client.config.GuildLogChannelId);
	const embed = new client.discord.MessageEmbed()
		.setTitle(`MR.SHARK Leave Guild Log`)
		.setThumbnail(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`)
		.addFields(
      { name: "Guild Name", value: `${guild.name}`, inline: true },
			{ name: "Guild ID", value: `${guild.id}`, inline: true },
			{ name: "Guild Owner", value: `${owner.user.tag}`, inline: true },
			{ name: "Guild Owner ID", value: `${owner.user.id}`, inline: true },
			{ name: "Guild Members", value: `${guild.memberCount}/${guild.members.cache.filter(member => !member.user.bot).size}/${guild.members.cache.filter(member => member.user.bot).size}`, inline: true },
			{ name: "Guilds Count", value: `${client.guilds.cache.size}`, inline: true },
			{ name: "Users Count", value: `${client.users.cache.size}`, inline: true },
		)
  .setTimestamp()
	.setColor(client.random_color())
  .setFooter({
    text: client.config.embedfooterText,
    iconURL: client.user.avatarURL(),
  });
	fetchedChannel.send({ embeds: [embed] })
  }
}