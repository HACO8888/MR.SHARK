const USERS = require(`${process.cwd()}/models/users`)

module.exports = {
    name: 'setup',
    usage: `/setup`,
		category: "開發",
    description: '設定用戶金錢或是物品',
		description_localizations: {
			"en-US": "Setup Money or Item"
		},
    options: [
    	{
		    name: "細項",
		    description: "選擇要設定的細項",
		    type: 3,
				name_localizations: {
			    "en-US": "setting"
		  	},
		  	description_localizations: {
			    "en-US": "Choose a Setting"
		  	},
		    required: true,
		    choices: [
					{
						name: "設置金錢",
						value: "setmoney"
					},
					{
						name: "增加金錢",
						value: "addmoney"
					},
					{
						name: "扣除金錢",
						value: "removemoney"
					},
					{
						name: "重設金錢",
						value: "resetmoney"
					},
					{
						name: "設置職業",
						value: "setjob"
					},
				],
			},
			{
				name: "物品",
				description: "輸入物品名稱",
				type: 3,
				required: false,
			},
			{
				name: "數字",
				description: "輸入數字",
				type: 3,
				required: false,
			},
			{
				name: "用戶",
				description: "請選擇一個成員",
				type: 6,
				required: false,
			},
			{
				name: "職業",
				description: "請選擇一個職業",
				type: 3,
				required: false,
				choices: [
					{
						name: "礦工",
						value: "miner"
					},
				],
			}
		],
  	run: async (client, interaction) => {
    if(interaction.member.id !== '536445172247167016' && interaction.member.id !== '508964901415550976'&& interaction.member.id !== '450140542291148803') return interaction.reply('❌你不是開發人員');

		const user = interaction.options.getUser('用戶') || interaction.user
		var userDB = await USERS.findOne({ userID: user.id });
		if (!userDB) {
			const NewuserDB = new USERS({
				userID: user.id,
				Money: [0,0,0,0,0],//1.錢幣 2.鑽石
				level: [0,0],
				item: [""],
				marry: "NOPE",
				premium: false,
			})
			await NewuserDB.save();
			userDB = await USERS.findOne({ userID: user.id });
		}

		const embed = new client.discord.MessageEmbed()
		embed.setColor(client.random_color())
		embed.setTimestamp(Date.now())
		embed.setFooter({
				text: client.config.embedfooterText,
				icon_url: client.user.avatarURL(),
		});
		if (interaction.options.getString('細項') == "setmoney")	{
			let old_num = userDB.Money[0];
			let num = 0;
			if (!interaction.options.getString('數字')) {
				num = 0;
			} else {
				num = parseInt(interaction.options.getString('數字'));
			}
			userDB.Money[0] = num;
			userDB.save();
			embed.setTitle(`金錢系統`)
			embed.setDescription(`成功將${user.tag}的金錢 設定成\`${num}\`元`)
		} else if (interaction.options.getString('細項') == "addmoney")	{
			if (!interaction.options.getString('數字')) {
				embed.setTitle(`金錢系統`)
				embed.setDescription(`請輸入需要增加多少金錢`)
				interaction.reply({ embeds: [embed]});
				return
			} else {
				num = parseInt(userDB.Money[0].toString()) + parseInt(interaction.options.getString('數字'));
			}
			userDB.Money[0] = num;
			userDB.save();
			embed.setTitle(`金錢系統`)
			embed.setDescription(`成功將${user.tag}的金錢 增加了\`${parseInt(interaction.options.getString('數字'))}\`元 現在他有\`${num}\`元`)
			let now = new Date()
		} else if (interaction.options.getString('細項') == "removemoney")	{
			if (!interaction.options.getString('數字')) {
				embed.setTitle(`金錢系統`)
				embed.setDescription(`請輸入需要扣除多少金錢`)
		        interaction.reply({ embeds: [embed]});
				
				return
			} else {
				num = parseInt(userDB.Money[0].toString()) - parseInt(interaction.options.getString('數字'));
			}
			userDB.Money[0] = num;
			userDB.save();
			embed.setTitle(`金錢系統`)
			embed.setDescription(`成功將${user.tag}的金錢 扣除了\`${parseInt(interaction.options.getString('數字'))}\`元 現在他還有\`${num}\`元`)
			
		} else if (interaction.options.getString('細項') == "resetmoney")	{
			userDB.Money[0] = 0;
			userDB.save();
			embed.setTitle(`金錢系統`)
			embed.setDescription(`成功將${user.tag}的金錢 重新設定為\`0\`元`)
		} else if (interaction.options.getString('細項') == "setjob")	{
			if (!interaction.options.getString('職業')) {
				embed.setTitle(`職業系統`)
				embed.setDescription(`請輸入要設定的職業`)
		    return interaction.reply({ embeds: [embed]});
			} else {
				userDB.job = interaction.options.getString('職業');
				userDB.save();
				embed.setTitle(`職業系統`)
				embed.setDescription(`成功將${user.tag}的職業設置為\`${interaction.options.getString('職業')}\``)
			}
		}
		interaction.reply({ embeds: [embed]});
	}
}