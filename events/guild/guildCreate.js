module.exports = {
  name: "guildCreate",
  async execute(client, guild) {

	const invitechannel = 
		guild.channels.cache 
			.filter((invitechannel) => invitechannel.type === 'GUILD_TEXT')
      .first() || guild.systemChannel
  if (!invitechannel || !guild.members.cache.get(client.user.id).permissions.has('CREATE_INSTANT_INVITE')) return console.log(guild.members.cache.get(client.user.id).permissions.has('CREATE_INSTANT_INVITE'));
	var inviteurl
  await invitechannel
		.createInvite({ maxAge: 0, maxUses: 0 })
    .then(async (invite) => {inviteurl = invite.url})
		
	const owner = guild.members.cache.get(guild.ownerId)
	const channel = await client.channels.fetch(client.config.GuildLogChannelId);
  const embed = new client.discord.MessageEmbed()
		.setTitle(`MR.SHARK Join Guild Log`)
		.setThumbnail(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`)
		.addFields(
	    { name: "Guild Name", value: `${guild.name}`, inline: true },
			{ name: "Guild ID", value: `${guild.id}`, inline: true },
			{ name: "Guild Owner", value: `${owner.user.tag}`, inline: true },
			{ name: "Guild Owner ID", value: `${owner.user.id}`, inline: true },
			{ name: "Guild Members", value: `${guild.members.cache.size}/${guild.members.cache.filter(member => !member.user.bot).size}/${guild.members.cache.filter(member => member.user.bot).size}`, inline: true },
			{ name: "Guilds Count", value: `${client.guilds.cache.size}`, inline: true },
			{ name: "Users Count", value: `${client.users.cache.size}`, inline: true },
			{ name: "Guild Invite Url", value: inviteurl || `Don't Have Permission To Create`, inline: true },
		)
	  .setTimestamp()
		.setColor(client.random_color())
	  .setFooter({
	    text: client.config.embedfooterText,
	    iconURL: client.user.avatarURL(),
	  });
	  channel.send({ embeds: [embed] })
  }
}