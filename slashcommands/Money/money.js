const mongoose = require("mongoose");
const USERS = require(`${process.cwd()}/models/users`)

module.exports = {
	name: 'money',
	category: 'Money',
	description: "查看金錢",
	usage: `/money`,
	options: [
		{
			name: "用戶",
			description: "請選擇一個成員",
			type: 6,
			required: false,
		}
	],
    description: "查看用戶資訊",
    run: async (client, interaction) => {
    	await interaction.deferReply({ ephemeral: false }).catch(() => {});
		
		const user = interaction.options.getUser('用戶') || interaction.author
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
		const row = new client.discord.MessageActionRow().addComponents(
			new client.discord.MessageButton()
			.setLabel("去工作(開發中)")
			.setEmoji("⚒️")			
			.setCustomId(`do-job`)
			.setStyle("SUCCESS")
			.setDisabled(true),
			new client.discord.MessageButton()
			.setLabel("填寫回饋單")
			.setCustomId(`open-report-form`)
			.setStyle("SUCCESS")
    );
		const embed = new client.discord.MessageEmbed()
		.setTitle(user.tag + "資產")
		.addFields({ name:"🪙金幣:", value: userDB.Money[0].toString()}, { name:"💎鑽石:", value: userDB.Money[1].toString()})
		.setColor(client.random_color())
		.setTimestamp()
		.setFooter({
			text: client.config.embedfooterText,
			iconURL: client.user.avatarURL(),
		});
		interaction.followUp({embeds: [embed], components: [row]})
		// message.reply(userDB.Money[0].toString())
		// console.log(userDB["Money"][0])
	},
};