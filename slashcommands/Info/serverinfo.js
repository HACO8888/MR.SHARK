const verificationLevels = {
    NONE: '無',
    LOW: '低',
    MEDIUM: '中',
    HIGH: '(╯°□°）╯︵ ┻━┻',
    VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};
const premiumTier = {
	NONE: '0',
	TIER_1: '1',
	TIER_2: '2',
	TIER_3: '3'
};

module.exports = {
  name: "serverinfo",
  usage: "/serverinfo",
  category: "資訊",
  description: "查看機伺服器的一些資訊!",
  run: async (client, interaction) => {
		let time = interaction.guild.createdAt.toUTCString().split(" ");
		let hor = interaction.guild.createdAt.getUTCHours(8);
		let H = (hor+8) + time[4].substring(2);
		let ctime = time[3] + " " + H + " " + time[2] + " " + time[1] +", " +time[0] + " UTC+8";

		let Embed = new client.discord.MessageEmbed()
			.setTitle("伺服器資訊")
			.setThumbnail(`https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.png`)
			.addField("伺服器名稱", `${interaction.guild.name}`, true)
			.addField("伺服器ID", `${interaction.guild.id}`, true)
			.addField("伺服器人數", `:busts_in_silhouette:總人數 - ${interaction.guild.memberCount}\n:bust_in_silhouette:用戶 - ${interaction.guild.members.cache.filter(member => !member.user.bot).size}\n:robot:機器人 - ${interaction.guild.members.cache.filter(member => member.user.bot).size}`, true)
			.addField("伺服器擁有者", `<@${interaction.guild.ownerId}>`, true)
			.addField("伺服器驗證等級", `${verificationLevels[interaction.guild.verificationLevel]}`, true)
			.addField(`表情總數 - ${interaction.guild.emojis.cache.size}`, `靜態表情 - ${interaction.guild.emojis.cache.filter(emojis => !emojis.animated).size}\n動態表情 - ${interaction.guild.emojis.cache.filter(emojis => emojis.animated).size}` ,true)
			.addField("加成狀態", `<:ServerBoost:802751407937290240>等級 - ${premiumTier[interaction.guild.premiumTier]}\n<:NitroBoost:802751430301319208>加成 - ${interaction.guild.premiumSubscriptionCount}` ,true)
			.addField("身分組數", `${interaction.guild.roles.cache.size}`,true)
			.addField(`伺服器人數狀態 - ${interaction.guild.memberCount}`, `<:Online:746672406411870331>上線 - ${interaction.guild.members.cache.filter(member => member.presence?.status === 'online').size}\n<:Idle:746672449353154650>閒置 - ${interaction.guild.members.cache.filter(member => member.presence?.status === 'idle').size}\n<:Dnd:746672747287019610>請勿打擾 - ${interaction.guild.members.cache.filter(member => member.presence?.status === 'dnd').size}\n<:Offline:746672917584281630>離線/隱形 - ${interaction.guild.members.cache.filter(member => !member.presence || member.presence.status === 'offline').size}`, true)
			.addField(`頻道總數 - ${interaction.guild.channels.cache.size}`, `📚類別 - ${interaction.guild.channels.cache.filter(c => c.type === "GUILD_CATEGORY").size}\n📄文字頻道 - ${interaction.guild.channels.cache.filter(c => c.type === "GUILD_TEXT").size}\n🔊語音頻道 - ${interaction.guild.channels.cache.filter(c => c.type === "GUILD_VOICE").size}\n📢公告頻道 - ${interaction.guild.channels.cache.filter(c => c.type === "GUILD_NEWS").size}\n🛒商店頻道 - ${interaction.guild.channels.cache.filter(c => c.type === "GUILD_STORE").size}`, true)
			.addField("伺服器創建時間", `${interaction.guild.createdTimestamp}`, true)
			.setTimestamp()
			.setColor(client.random_color())
			.setFooter({
				text: client.config.embedfooterText,
				iconURL: client.user.avatarURL(),
			});
		interaction.reply({ embeds: [Embed],});
  },
};
