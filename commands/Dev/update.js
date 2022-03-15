module.exports = {
	name: 'update',
	usage: `sh!update`,
	category: "開發",
	description: '發送更新訊息',
	run: async (client, message, args) => {
    if(message.author.id !== '536445172247167016' && message.author.id !== '508964901415550976') return message.reply('❌你不是開發人員'); 
		message.delete();
		let Embed = new client.discord.MessageEmbed()
			.setTitle(`🔧更新啟用公告`)//⚠️停用更新公告 🔰機器人更新通知 🔧更新啟用公告
			.setDescription(`🔧Bot Update And Enable Announcement`)//⚠️Bot Stop And Update Announcement 🔰Bot Update Notify 🔧Bot Update And Enable Announcement
			.addFields({name:"<a:arrow:815255913953755216>啟用更新內容", value:"新增身分組或移除身分組後自動更改暱稱"})
			.setColor(client.random_color())
			.setFooter({
				text: client.config.embedfooterText,
				iconURL: client.user.avatarURL(),
			});
		await message.channel.send({ content: "<@everyone>", embeds:[Embed]});
	}
}
		