const { Modal, TextInputComponent, showModal } = require('discord-modals')
const USERS = require(`${process.cwd()}/models/darjob`)
module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
		if (!interaction.isButton()) return;
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
			if (userDB.jobyet === "YUP" && interaction.member.id !== "508964901415550976") {
				const channel = await client.channels.fetch("955180741396922429");
	      const embed = new client.discord.MessageEmbed()
				.setTitle(`達爾重複申請公職紀錄`)
				.setDescription(`${interaction.member.user.tag}(${interaction.member.displayName})重複申請了\n各公職高層必要時可拒絕此人任何項目申請`)
	      .setTimestamp()
				.setColor(client.random_color())
			  .setFooter({
			    text: client.config.embedfooterText,
			    iconURL: client.user.avatarURL(),
			  });
	      channel.send({ embeds: [embed] })
				await  interaction.deferReply ( {  ephemeral : true  } ) 
				interaction.followUp({ content: '❌你很糟糕已經申請過職業了，此通知已被紀錄給各公職高層，你的任何申請皆可能因此不通過', ephemeral: true  })
				return;
			}
		}
		if (interaction.customId === `open-dar-police-form`) {
			const modalpolice = new Modal()
			.setCustomId('modal-dar-police-form')
			.setTitle(`${interaction.member.user.username}歡迎申請警局`)
			.addComponents([
				new TextInputComponent()
				.setCustomId('player-info')
				.setLabel('請按照格是輸入基本資訊(缺少任何一項則不通過):')
				.setStyle('LONG')
				.setMinLength(35)
				.setMaxLength(200)
				.setPlaceholder('Discord名稱:MR.HACO#8888\n角色名稱:MR.HACO\n聯絡電話:587-8787\n現實年齡:15\n角色年齡:30')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-playtime')
				.setLabel('上班時間(平日｜假日):')
				.setStyle('SHORT')
				.setPlaceholder('3小時|5小時')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-whypolice')
				.setLabel('為甚麼想要在達爾小鎮從事警察:')
				.setStyle('LONG')
				.setMinLength(50)
				.setMaxLength(200)
				.setPlaceholder('因為我覺得警局缺少警局缺少我這樣的人才，我想盡一份心力...')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-yes1')
				.setLabel('是否了解您的申請可能因任何原因被拒絕，尤其是如果您未能滿足字詞要求或有犯罪記錄?(是/否)')
				.setStyle('SHORT')
				.setMinLength(1)
				.setMaxLength(1)
				.setPlaceholder('是')
				.setRequired(true),
        new TextInputComponent()
				.setCustomId('player-yes2')
				.setLabel('你是否有閱讀達爾天條和警察局公告並願意遵守規則?(是/否)')
				.setStyle('SHORT')
				.setMinLength(1)
				.setMaxLength(1)
				.setPlaceholder('是')
				.setRequired(true),
			]);
			showModal(modalpolice, {
				client: client,
				interaction: interaction
			})
		} else if (interaction.customId === `open-dar-ambulance-form`) {
			const modalambulance = new Modal()
			.setCustomId('modal-dar-ambulance-form')
			.setTitle(`${interaction.member.user.username}歡迎申請醫護局`)
			.addComponents([
				new TextInputComponent()
				.setCustomId('player-info1')
				.setLabel('請輸入Discord名稱:')
				.setStyle('SHORT')
				.setMinLength(6)
				.setMaxLength(20)
				.setPlaceholder('MR.HACO#8888')
				.setRequired(true),
        new TextInputComponent()
				.setCustomId('player-info2')
				.setLabel('請輸入遊戲內名稱:')
				.setMinLength(1)
				.setMaxLength(20)
				.setStyle('SHORT')
				.setPlaceholder('MR.HACO')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-info3')
				.setLabel('請輸入聯絡電話:')
				.setStyle('SHORT')
				.setMinLength(8)
				.setMaxLength(8)
				.setPlaceholder('587-8787')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-info4')
				.setLabel('請輸入你的真實年齡:')
				.setStyle('SHORT')
				.setMinLength(1)
				.setMaxLength(2)
				.setPlaceholder('15')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-playtime')
				.setLabel('上班時間填寫(格式錯誤將不予受理):')
				.setStyle('LONG')
				.setMinLength(0)
				.setMaxLength(200)
				.setPlaceholder('平日:17:00~21:00\n假日:14:00~21:00')
				.setRequired(true),
			]);
			showModal(modalambulance, {
				client: client,
				interaction: interaction
			})
		} else if (interaction.customId === `open-dar-usedcar-form`) {
			const modalambulance = new Modal()
			.setCustomId('modal-dar-usedcar-form')
			.setTitle(`${interaction.member.user.username}歡迎申請鷹中國際`)
			.addComponents([
				new TextInputComponent()
				.setCustomId('player-info1')
				.setLabel('請輸入Discord名稱:')
				.setStyle('SHORT')
				.setMinLength(6)
				.setMaxLength(20)
				.setPlaceholder('MR.HACO#8888')
				.setRequired(true),
        new TextInputComponent()
				.setCustomId('player-info2')
				.setLabel('請輸入遊戲內名稱:')
				.setMinLength(1)
				.setMaxLength(20)
				.setStyle('SHORT')
				.setPlaceholder('MR.HACO')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-info3')
				.setLabel('請輸入聯絡電話:')
				.setStyle('SHORT')
				.setMinLength(8)
				.setMaxLength(8)
				.setPlaceholder('587-8787')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-info4')
				.setLabel('請填寫自我介紹:')
				.setStyle('LONG')
				.setMinLength(20)
				.setMaxLength(1000)
				.setPlaceholder('我是......')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-playtime')
				.setLabel('上班時間填寫(格式錯誤將不予受理):')
				.setStyle('LONG')
				.setMinLength(0)
				.setMaxLength(200)
				.setPlaceholder('平日:17:00~21:00\n假日:14:00~21:00')
				.setRequired(true),
			]);
			showModal(modalambulance, {
				client: client,
				interaction: interaction
			})
		} else if (interaction.customId === `open-dar-usedcar-form`) {
			const modalambulance = new Modal()
			.setCustomId('modal-dar-usedcar-form')
			.setTitle(`${interaction.member.user.username}歡迎申請鷹中國際`)
			.addComponents([
				new TextInputComponent()
				.setCustomId('player-info1')
				.setLabel('請輸入Discord名稱:')
				.setStyle('SHORT')
				.setMinLength(6)
				.setMaxLength(20)
				.setPlaceholder('MR.HACO#8888')
				.setRequired(true),
        new TextInputComponent()
				.setCustomId('player-info2')
				.setLabel('請輸入遊戲內名稱:')
				.setMinLength(1)
				.setMaxLength(20)
				.setStyle('SHORT')
				.setPlaceholder('MR.HACO')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-info3')
				.setLabel('請輸入聯絡電話:')
				.setStyle('SHORT')
				.setMinLength(8)
				.setMaxLength(8)
				.setPlaceholder('587-8787')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-info4')
				.setLabel('請填寫自我介紹:')
				.setStyle('LONG')
				.setMinLength(20)
				.setMaxLength(1000)
				.setPlaceholder('我是......')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-playtime')
				.setLabel('上班時間填寫(格式錯誤將不予受理):')
				.setStyle('LONG')
				.setMinLength(0)
				.setMaxLength(200)
				.setPlaceholder('平日:17:00~21:00\n假日:14:00~21:00')
				.setRequired(true),
			]);
			showModal(modalambulance, {
				client: client,
				interaction: interaction
			})
			//////////////////////////////////////////////////////////////
	} else if (interaction.customId === `open-dar-garage-form`) {
			const modalgarage = new Modal()
			.setCustomId('modal-dar-garage-form')
			.setTitle(`${interaction.member.user.username}歡迎申修車廠`)
			.addComponents([
				new TextInputComponent()
				.setCustomId('player-info')
				.setLabel('請按照格是輸入基本資訊(缺少任何一項則不通過):')
				.setStyle('LONG')
				.setMinLength(35)
				.setMaxLength(200)
				.setPlaceholder('Discord名稱:MR.HACO#8888\n角色名稱:MR.HACO\n聯絡電話:587-8787\n現實年齡:15\n角色年齡:30')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-playtime')
				.setLabel('上班時間填寫(格式錯誤將不予受理):')
				.setStyle('LONG')
				.setMinLength(0)
				.setMaxLength(200)
				.setPlaceholder('平日:17:00~21:00\n假日:14:00~21:00')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-whygarage')
				.setLabel('為甚麼想要在達爾小鎮從事修車廠:')
				.setStyle('LONG')
				.setMinLength(50)
				.setMaxLength(1000)
				.setPlaceholder('因為我覺得警局缺少警局缺少我這樣的人才，我想盡一份心力...')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-yes1')
				.setLabel('是否可以遵守規定?(是/否)')
				.setStyle('SHORT')
				.setMinLength(1)
				.setMaxLength(1)
				.setPlaceholder('是')
				.setRequired(true),
        new TextInputComponent()
				.setCustomId('player-yes2')
				.setLabel('是否可以接受剛入職有七天試用期?(是/否)')
				.setStyle('SHORT')
				.setMinLength(1)
				.setMaxLength(1)
				.setPlaceholder('是')
				.setRequired(true),
			]);
			showModal(modalgarage, {
				client: client,
				interaction: interaction
			})
	}	else if (interaction.customId === `open-dar-uber-form`) {
			const modaluber = new Modal()
			.setCustomId('modal-dar-uber-form')
			.setTitle(`${interaction.member.user.username}歡迎申請UBER`)
			.addComponents([
				new TextInputComponent()
				.setCustomId('player-info1')
				.setLabel('請輸入您的真實年齡:')
				.setStyle('SHORT')
				.setMinLength(1)
				.setMaxLength(2)
				.setPlaceholder('15')
				.setRequired(true),
        new TextInputComponent()
				.setCustomId('player-info2')
				.setLabel('請輸入遊戲內名稱:')
				.setMinLength(1)
				.setMaxLength(20)
				.setStyle('SHORT')
				.setPlaceholder('MR.HACO')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-info3')
				.setLabel('請輸入聯絡電話:')
				.setStyle('SHORT')
				.setMinLength(8)
				.setMaxLength(8)
				.setPlaceholder('587-8787')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-info4')
				.setLabel('請填寫自我介紹:')
				.setStyle('LONG')
				.setMinLength(20)
				.setMaxLength(1000)
				.setPlaceholder('我是......')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('player-playtime')
				.setLabel('上班時間填寫(格式錯誤將不予受理):')
				.setStyle('LONG')
				.setMinLength(0)
				.setMaxLength(200)
				.setPlaceholder('平日:17:00~21:00\n假日:14:00~21:00')
				.setRequired(true),
			]);
			showModal(modaluber, {
				client: client,
				interaction: interaction
			})
		}
	} 
}
