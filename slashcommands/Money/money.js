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
			description: "請選擇要查看的用戶",
			type: 6,
			required: false,
		}
	],
	run: async (client, interaction) => {
		
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
				job: "NOPE",
			})
			await NewuserDB.save();
			userDB = await USERS.findOne({ userID: user.id });
		}
		const row = new client.discord.MessageActionRow().addComponents(
			new client.discord.MessageButton()
			.setLabel("交易紀錄")
			.setEmoji("📕")			
			.setCustomId(`money-log-${user.id}`)
			.setStyle("SUCCESS"),
			// new client.discord.MessageButton()
			// .setLabel("去工作(開發中)")
			// .setEmoji("⚒️")			
			// .setCustomId(`do-job`)
			// .setStyle("SUCCESS")
			// .setDisabled(true),
			new client.discord.MessageButton()
			.setLabel("填寫回饋單")
			.setEmoji("📑")		
			.setCustomId(`open-report-form`)
			.setStyle("SUCCESS")
    );
		const embed = new client.discord.MessageEmbed()
		// .setTitle(user.tag + "資產")
		.setAuthor({name:`${user.username} 的資產`, iconURL: user.displayAvatarURL({ dynamic: true })})
		.addFields({ name:"🪙金幣:", value: userDB.Money[0].toString(), inline: true}, { name:"💎鑽石:", value: userDB.Money[1].toString(), inline: true})
		.setColor(client.random_color())
		.setTimestamp()
		.setFooter({
			text: client.config.embedfooterText,
			iconURL: client.user.avatarURL(),
		});
		interaction.reply({embeds: [embed], components: [row]})
		// message.reply(userDB.Money[0].toString())
		// console.log(userDB["Money"][0])
	},
};