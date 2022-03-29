const { Formatters } = require('discord.js');
const USERS = require(`${process.cwd()}/models/darjob`)
module.exports = {
	name: "modalSubmit",
  async execute(client, interaction) {
		if (interaction.guildId === `747765361302044732`) {
			var userDB = await USERS.findOne({ userID: interaction.member.id });
			if (!userDB) {
				const NewuserDB = new USERS({
					userID: interaction.member.id,
					jobyet: "NOPE",
					whichjob: "NOPE"
				})
				await NewuserDB.save();
				userDB = await USERS.findOne({ userID: interaction.member.id });
			}
			userDB.jobyet = "YUP";
			userDB.save();
		}
    const row = new client.discord.MessageActionRow().addComponents(
      new client.discord.MessageButton()
			.setLabel("申請通過")
			.setEmoji("⭕")		
			.setCustomId(`dar-delete-job-db-y-${interaction.member.id}`)
			.setStyle("SUCCESS"),
      // .setDisabled(true),
			new client.discord.MessageButton()
			.setLabel("申請不通過")
			.setEmoji("❌")		
			.setCustomId(`dar-delete-job-db-n-${interaction.member.id}`)
			.setStyle("DANGER"),
      // .setDisabled(true),
			new client.discord.MessageButton()
			.setLabel("填寫回饋單")
			.setEmoji("📑")		
			.setCustomId(`open-report-form`)
			.setStyle("SUCCESS")
		);
		if(interaction.customId === 'modal-dar-police-form'){
	    const player_info = interaction.getTextInputValue('player-info')
			const player_playtime = interaction.getTextInputValue('player-playtime')
			const player_whypolice = interaction.getTextInputValue('player-whypolice')
			const player_yes1 = interaction.getTextInputValue('player-yes1')
			const player_yes2 = interaction.getTextInputValue('player-yes2')	
	    const channel = await client.channels.fetch("955061811638566962");
			const embed = new client.discord.MessageEmbed()
			.setTitle(`警局申請紀錄`)
      .setDescription(`這份比單是由  ${interaction.member.user.tag}(${interaction.member.displayName})  送出\n審核人請一定要按按鈕，不然玩家會失去再次申請公職資格\n不通過也要自行通知`)
			.addFields(
				{ name: "玩家基本資料", value: "```" + player_info + "```", inline: false },
	      { name: "玩家可遊玩時間(平日｜假日)", value: "```" + player_playtime + "```", inline: false },
				{ name: "玩家想加入原因", value: "```" + player_whypolice + "```", inline: false },
				{ name: "玩家是否了解申請可能因任何原因被拒絕", value: "```" + player_yes1 + "```", inline: false },
				{ name: "玩家是否有閱讀達爾天條和警察局公告並願意遵守規則", value: "```" + player_yes2 + "```", inline: false },
			)
		  .setTimestamp()
			.setColor(client.random_color())
		  .setFooter({
		    text: client.config.embedfooterText,
		    iconURL: client.user.avatarURL(),
		  });
			channel.send({ embeds: [embed], components: [row], })
			await  interaction.deferReply ( {  ephemeral : true  } ) 
			interaction.followUp({ content: '⭕ ｜ 成功申請警局 ｜ 請等待後續通知!', ephemeral: true  })
  	} else if (interaction.customId === 'modal-dar-ambulance-form') {
			const player_info1 = interaction.getTextInputValue('player-info1')
			const player_info2 = interaction.getTextInputValue('player-info2')
			const player_info3 = interaction.getTextInputValue('player-info3')
			const player_info4 = interaction.getTextInputValue('player-info4')
			const player_playtime = interaction.getTextInputValue('player-playtime')
	    const channel = await client.channels.fetch("955104623809683538");
			const embed = new client.discord.MessageEmbed()
			.setTitle(`醫護局申請紀錄`)
			.addFields(
				{ name: "玩家Discord名稱", value: "```" + player_info1 + "```", inline: false },
	      { name: "玩家遊戲內名稱", value: "```" + player_info2 + "```", inline: false },
				{ name: "玩家聯絡電話", value: "```" + player_info3 + "```", inline: false },
				{ name: "玩家真實年齡", value: "```" + player_info4 + "```", inline: false },
				{ name: "玩家上班時間", value: "```" + player_playtime + "```", inline: false },
			)
		  .setTimestamp()
			.setColor(client.random_color())
		  .setFooter({
		    text: client.config.embedfooterText,
		    iconURL: client.user.avatarURL(),
		  });
			channel.send({ embeds: [embed], components: [row], })
			await  interaction.deferReply ( {  ephemeral : true  } ) 
			interaction.followUp({ content: '⭕ ｜ 成功申請醫護局 ｜ 請等待後續通知!', ephemeral: true  })
		// }	else if (interaction.customId === 'modal-dar-usedcar-form') {
		// 	const player_info1 = interaction.getTextInputValue('player-info1')
		// 	const player_info2 = interaction.getTextInputValue('player-info2')
		// 	const player_info3 = interaction.getTextInputValue('player-info3')
		// 	const player_info4 = interaction.getTextInputValue('player-info4')
		// 	const player_playtime = interaction.getTextInputValue('player-playtime')
	 //    const channel = await client.channels.fetch("955903143999336488");
		// 	const embed = new client.discord.MessageEmbed()
		// 	.setTitle(`鷹中國際申請紀錄`)
  //     .setDescription(`這份比單是由  ${interaction.member.user.tag}(${interaction.member.displayName})  送出\n審核人請一定要按按鈕，不然玩家會失去再次申請公職資格\n不通過也要自行通知`)
		// 	.addFields(
		// 		{ name: "玩家Discord名稱", value: "```" + player_info1 + "```", inline: false },
	 //      { name: "玩家遊戲內名稱", value: "```" + player_info2 + "```", inline: false },
		// 		{ name: "玩家聯絡電話", value: "```" + player_info3 + "```", inline: false },
		// 		{ name: "玩家個人介紹", value: "```" + player_info4 + "```", inline: false },
		// 		{ name: "玩家上班時間", value: "```" + player_playtime + "```", inline: false },
		// 	)
		//   .setTimestamp()
		// 	.setColor(client.random_color())
		//   .setFooter({
		//     text: client.config.embedfooterText,
		//     iconURL: client.user.avatarURL(),
		//   });
		// 	channel.send({ embeds: [embed], components: [row], })
		// 	await  interaction.deferReply ( {  ephemeral : true  } ) 
		// 	interaction.followUp({ content: '⭕ ｜ 成功申請鷹中國際 ｜ 請等待後續通知!', ephemeral: true  })
		} else if(interaction.customId === 'modal-dar-garage-form'){
	    const player_info = interaction.getTextInputValue('player-info')
			const player_playtime = interaction.getTextInputValue('player-playtime')
			const player_hygarage = interaction.getTextInputValue('player-whygarage')
			const player_yes1 = interaction.getTextInputValue('player-yes1')
			const player_yes2 = interaction.getTextInputValue('player-yes2')	
	    const channel = await client.channels.fetch("955500508766961744");
			const embed = new client.discord.MessageEmbed()
			.setTitle(`修車廠申請紀錄`)
      .setDescription(`這份比單是由  ${interaction.member.user.tag}(${interaction.member.displayName})  送出\n審核人請一定要按按鈕，不然玩家會失去再次申請公職資格\n不通過也要自行通知`)
			.addFields(
				{ name: "玩家基本資料", value: "```" + player_info + "```", inline: false },
	      { name: "玩家可遊玩時間", value: "```" + player_playtime + "```", inline: false },
				{ name: "玩家想從事修車廠原因", value: "```" + player_hygarage + "```", inline: false },
				{ name: "玩家是否可以遵守規定", value: "```" + player_yes1 + "```", inline: false },
				{ name: "玩家是否可以接受剛入職有七天試用期?", value: "```" + player_yes2 + "```", inline: false },
			)
		  .setTimestamp()
			.setColor(client.random_color())
		  .setFooter({
		    text: client.config.embedfooterText,
		    iconURL: client.user.avatarURL(),
		  });
			channel.send({ embeds: [embed], components: [row], })
			await  interaction.deferReply ( {  ephemeral : true  } ) 
			interaction.followUp({ content: '⭕ ｜ 成功申修車廠 ｜ 請等待後續通知!', ephemeral: true  })
  	} else if(interaction.customId === 'modal-dar-uber-form'){
	    const player_info1 = interaction.getTextInputValue('player-info1')
			const player_info2 = interaction.getTextInputValue('player-info2')
			const player_info3 = interaction.getTextInputValue('player-info3')
			const player_info4 = interaction.getTextInputValue('player-info4')
			const player_playtime = interaction.getTextInputValue('player-playtime')
	    const channel = await client.channels.fetch("955502056939085904");
			const embed = new client.discord.MessageEmbed()
			.setTitle(`UBER申請紀錄`)
      .setDescription(`這份比單是由  ${interaction.member.user.tag}(${interaction.member.displayName})  送出\n審核人請一定要按按鈕，不然玩家會失去再次申請公職資格\n不通過也要自行通知`)
			.addFields(
				{ name: "玩家Discord名稱", value: "```" + player_info1 + "```", inline: false },
	      { name: "玩家遊戲內名稱", value: "```" + player_info2 + "```", inline: false },
				{ name: "玩家聯絡電話", value: "```" + player_info3 + "```", inline: false },
				{ name: "玩家真實年齡", value: "```" + player_info4 + "```", inline: false },
				{ name: "玩家上班時間", value: "```" + player_playtime + "```", inline: false },
			)                                              
		  .setTimestamp()
			.setColor(client.random_color())
		  .setFooter({
		    text: client.config.embedfooterText,
		    iconURL: client.user.avatarURL(),
		  });
			channel.send({ embeds: [embed], components: [row], })
			await  interaction.deferReply ( {  ephemeral : true  } ) 
			interaction.followUp({ content: '⭕ ｜ 成功申修UBER ｜ 請等待後續通知!', ephemeral: true  })
  	}
	}
}