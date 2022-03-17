module.exports = {
  name: "messageCreate",
  async execute(client, message) {

		if (message.author.bot){
			return;
		}

		if (!message.content.toLowerCase().startsWith(client.config.prefix)){
			return;
		}
		
		if (!message.guild){
			message.reply("機器人目前不支援私訊使用指令")
			return;
		}
		
	  if (message.author.bot || !message.content.toLowerCase().startsWith(client.config.prefix)){
			return;
		}
		
	  const [cmd, ...args] = message.content
	    .slice(client.config.prefix.length)
	    .trim()
	    .split(" ");
	
	  const command =
	    client.commands.get(cmd.toLowerCase()) ||
	    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
	
	  if (!command) return message.reply("這指令不存在或是已經過期了");
		const owner = client.users.cache.get(message.guild.ownerId);
		const embed = new client.discord.MessageEmbed()
	    .setTitle(`MR.SHARK Command Log`)
			.addFields(
        { name: "Command Name", value: `${command.name}`, inline: true },
				{ name: "Message ID", value: `${message.id}`, inline: true },
				{ name: "Message Url", value: `[Click To Go](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`, inline: true },
				{ name: "User Name", value: `${message.author.tag}`, inline: true },
				{ name: "User ID", value: `${message.author.id}`, inline: true },
				{ name: "User Mention", value: `<@${message.author.id}>`, inline: true },
				{ name: "Guild Name", value: `${message.guild.name}`, inline: true },
				{ name: "Guild ID", value: `${message.guild.id}`, inline: true },
				{ name: "Guild Owner", value: `${owner.tag}`, inline: true },
				{ name: "Channel Name", value: `${message.channel.name}`, inline: true },
				{ name: "Channel ID", value: `${message.channel.id}`, inline: true },
				{ name: "Channel Mention", value: `<#${message.channel.id}>`, inline: true },
			)
			.setColor(client.random_color())
			.setFooter({
				text: client.config.embedfooterText,
				iconURL: client.user.avatarURL(),
	  	});
	
		const guild = client.guilds.cache.get("806477754681262100");
		const channel = guild.channels.cache.get("932928827976478741");
		channel.send({ embeds: [embed] });
	  await command.run(client, message, args);
	}
}
