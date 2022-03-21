
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
		// await message.channel.send("目前驗證人數:0人");

		message.delete();
		let Embed = new client.discord.MessageEmbed()
		.setTitle(`達爾公職申請區`)
		.setDescription(`✅請注意以下規則`)
		.addFields(
			{name:"1.請仔細看好想要選取並申請的職業", value:"\u200b"},
			{name:"2.為了防止重複選擇，申請後即不可申請其他職業", value:"\u200b"},
			{name:"3.不要玩弄機器人，如果玩壞了你將付出相對應的代價", value:"\u200b"},
			{name:"4.因目前處於測試階段，如有BUG請填寫回饋單，有些職業尚未開放申請", value:"\u200b"},
		)
		.setColor(client.random_color())
		.setFooter({
			text: client.config.embedfooterText,
			iconURL: client.user.avatarURL(),
		});		
		let Embed2 = new client.discord.MessageEmbed()
		.setTitle(`達爾建議給予`)
		.setDescription(`✅請注意以下規則`)
		.addFields(
			{name:"1.請確實選取要給予的建議種類", value:"\u200b"},
			{name:"2.所有建議管理員都一定會看到不要一直重複發送", value:"\u200b"},
			{name:"3.不要玩弄機器人，如果玩壞了你將付出相對應的代價", value:"\u200b"},
			{name:"4.因目前處於測試階段，如有BUG請填寫回饋單，有些職業尚未開放申請", value:"\u200b"},
		)
		.setColor(client.random_color())
		.setFooter({
			text: client.config.embedfooterText,
			iconURL: client.user.avatarURL(),
		});

		const row = new client.discord.MessageActionRow().addComponents(
      new client.discord.MessageButton()
			.setLabel("申請警局")
			.setEmoji("🚔")		
			.setCustomId(`open-dar-police-form`)
			.setStyle("SECONDARY"),
			new client.discord.MessageButton()
			.setLabel("申請醫護局")
			.setEmoji("🚨")		
			.setCustomId(`open-dar-ambulance-form`)
			.setStyle("SECONDARY"),
			// .setDisabled(true),
			new client.discord.MessageButton()
			.setLabel("申請海濱餐酒館")
			.setEmoji("🍹")		
			.setCustomId(`open-dar-restaurant-form`)
			.setStyle("SECONDARY")
			.setDisabled(true),
		);
		const row2 = new client.discord.MessageActionRow().addComponents(
			new client.discord.MessageButton()
			.setLabel("申請鷹中國際二手車商")
			.setEmoji("🚙")		
			.setCustomId(`open-dar-usedcar-form`)
			.setStyle("SECONDARY"),
			new client.discord.MessageButton()
			.setLabel("申請修車廠")
			.setEmoji("🔩")		
			.setCustomId(`open-dar-garage-form`)
			.setStyle("SECONDARY"),
			// .setDisabled(true),
			new client.discord.MessageButton()
			.setLabel("申請uber")
			.setEmoji("🚕")		
			.setCustomId(`open-dar-uber-form`)
			.setStyle("SECONDARY"),
			// .setDisabled(true),
    );
		const row3 = new client.discord.MessageActionRow().addComponents(
			new client.discord.MessageButton()
			.setLabel("邀請我到伺服器")
			.setStyle("LINK")
			.setEmoji("<:bot:950346766237175849")	
			.setURL(
				"https://discord.com/api/oauth2/authorize?client_id=949772996216750171&permissions=8&scope=bot%20applications.commands"
			),
      new client.discord.MessageButton()
			.setLabel("官方支援群組")
			.setStyle("LINK")
			.setEmoji("<:discord:857215040666337291>")		
			.setURL("https://discord.gg/RtsckgRjqJ"),
			new client.discord.MessageButton()
			.setLabel("填寫回饋單")
			.setEmoji("📑")		
			.setCustomId(`open-report-form`)
			.setStyle("SUCCESS")
		);
    
    const select = new client.discord.MessageActionRow()
		.addComponents(
			new client.discord.MessageSelectMenu()
			.setCustomId('select')
			.setPlaceholder('你還沒選擇任何東西')
			.addOptions([
				{
					label: '💼｜伺服器建議區',
					description: '',
					value: 'server',
				},
				{
					label: '🚗｜車輛建議',
					description: '',
					value: 'car',
				},
				{
					label: '🚗｜車輛引擎聲音建議',
					description: '',
					value: 'car_spund',
				},
				{
					label: '🚗｜車輛數據價格建議',
					description: '',
					value: 'car_money',
				},
				{
					label: '👕｜服裝建議',
					description: '',
					value: 'cloth',
				},
			]),
		);

		message.channel.send({embeds:[Embed], components: [row, row2, row3],});
	}
}