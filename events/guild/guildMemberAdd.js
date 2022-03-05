const Canvas = require("discord-canvas");
const { MessageAttachment } = require('discord.js');

module.exports = {
  name: "guildMemberAdd",
  async execute(client, member) {
	  if (member.guild.id === "773205132472877090") {
			const image = await new Canvas.Welcome()
	  		.setUsername(member.user.username)
				.setDiscriminator(member.user.discriminator)
				.setMemberCount(member.guild.memberCount)
				.setGuildName(member.guild.name)
				.setAvatar(member.user.displayAvatarURL({ format: "png" }))
				.setColor("border", "#8015EA")
				.setColor("username-box", "#8015EA")
				.setColor("discriminator-box", "#8015EA")
				.setColor("message-box", "#8015EA")
				.setColor("title", "#8015EA")
				.setColor("avatar", "#8015EA")
				.setBackground("./background.png")
				.toAttachment();
			const attachment = new MessageAttachment(image.toBuffer(), "welcome-image.png");
	    const guild = client.guilds.cache.get(member.guild.id);
	    const channel = guild.channels.cache.get("774993563498184716");
	    channel.send({content: "<@" + member.id + ">, 歡迎來到" + member.guild.name + "我們現在有" + member.guild.memberCount + "人了.", files: [attachment]});
  	}
	}
}
