module.exports = {
  name: "report",
  usage: "sh!report <要回報的內容>",
  category: "一般",
  description: "回報機器人問題或是給予建議!",
  run: async (client, message, args) => {
		if (!args[0]) {
			message.reply("❌ | 回報失敗 | 原因:你沒有輸入要回報的內容")
			return;
		} else {
			const embed = new client.discord.MessageEmbed()
	      .setTitle(`MR.SHARK 回報系統`)
				.addFields(
            { name: "回報人名稱", value: `${message.author.tag}`, inline: true },
            { name: "回報人ID", value: `${message.author.id}`, inline: true },
            { name: "回報內容", value: `${args[0]}`, inline: false },
						{ name: "回報ID", value: `回報ID:${message.guild.id}${message.channel.id}${message.id}`, inline:false }
          )
	      .setColor(client.random_color())
	      .setFooter({
	      text: client.config.embedfooterText,
	      iconURL: client.user.avatarURL(),
	    });
	
			const guild = client.guilds.cache.get("773205132472877090");
			const channel = guild.channels.cache.get("949641073356058694");
			channel.send({ embeds: [embed] });
			message.reply(`⭕ | 回報成功 | 回報ID:\`${message.guild.id}${message.channel.id}${message.author.id}\``);
			return;
		}
	}
}
