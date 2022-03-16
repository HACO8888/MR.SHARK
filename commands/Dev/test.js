
module.exports = {
	name: 'test',
	usage: `sh!test`,
	category: "開發",
	description: '測試指令',
	run: async (client, message, args) => {
    if(message.author.id !== '536445172247167016' && message.author.id !== '508964901415550976') return message.reply('❌你不是開發人員'); 
		// let Embed = new client.discord.MessageEmbed()
		// 	.setTitle(`<:shark:875677583277166603>歡迎來到Shark Development驗證專區`)//⚠️停用更新公告 🔰機器人更新通知 🔧更新啟用公告
		// 	.setDescription(`✅請仔細閱讀以下驗證條件`)//⚠️Bot Stop And Update Announcement 🔰Bot Update Notify 🔧Bot Update And Enable Announcement
		// 	.addFields(
		// 		{name:"1.把該讀的東西好好讀完", value:"請至<#774993853735501874>讀完規則再回來這裡"},
		// 		{name:"2.想盡辦法宣傳我們的東西", value:"請至<#794064325450137610>複製你想複製的宣傳連結然後宣傳"},
		// 		{name:"3.盡可能參與所有活動懂嗎", value:"定期追蹤<#774993950686576640>和<#796354819744333866>保證會有讓你期待的東西"},
		// 		{name:"4.了解一下所有身分組和合作團隊", value:"請至<#951483739010134056>了解我們的所有身分組，然後到<#952110838037229578>看我們的合作團隊"},
		// 		{name:"5.Nitro贈送獎勵講解與說明請仔細看", value:"加入並邀請20個人，那20人都有打字可獲得Nitro*1，實際人數以Invite Tracker統計為主"},
		// 	)
			
		// 	.setColor(client.random_color())
		// 	.setFooter({
		// 		text: client.config.embedfooterText,
		// 		iconURL: client.user.avatarURL(),
		// 	});
		// const msg = await message.channel.send({embeds:[Embed]});
		// msg.react('✅');
		await message.channel.send("目前驗證人數:0人");
	}
}