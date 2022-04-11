const USERS = require(`${process.cwd()}/models/users`)
const LOG = require(`${process.cwd()}/models/moneylog`)

module.exports = {
	name: 'pay',
	category: 'Money',
	description: "付款給其他人",
	usage: `/pay <要接收付款的人>`,
	options: [
		{
			name: "受款者",
			description: "請選擇一個使用者",
			type: 6,
			required: true,
		},
		{
			name: "金額",
			description: "清輸入要付款的金額",
			type: 4,
			required: true,
		},
	],
  run: async (client, interaction) => {
		const money = interaction.options.getInteger('金額');
		const user = interaction.user
		const user2 =interaction.options.getUser('受款者');
		var userDB = await USERS.findOne({ userID: user2.id });
		if (!userDB) {
			const NewuserDB = new USERS({
				userID: user2.id,
				Money: [0,0,0,0,0],//1.錢幣 2.鑽石
				level: [0,0],
				item: [""],
				marry: "NOPE",
				premium: false,
				job: "NOPE",
			})
			await NewuserDB.save();
			userDB = await USERS.findOne({ userID: user2.id });
		}
		var puserDB = await USERS.findOne({ userID: user.id });
		if (!puserDB) {
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
			puserDB = await USERS.findOne({ userID: user.id });
		}
		var logDB = await LOG.findOne({ userID: user2.id });
		if (!logDB) {
			const NewlogDB = new LOG({
				userID: user2.id,
				log: [],
			})
			await NewlogDB.save();
			logDB = await LOG.findOne({ userID: user2.id });
		}
		var plogDB = await LOG.findOne({ userID: user.id });
		if (!plogDB) {
			const NewlogDB = new LOG({
				userID: user.id,
				log: [],
			})
			await NewlogDB.save();
			plogDB = await LOG.findOne({ userID: user.id });
		}
		if (money < 0) {
			const Embed = new client.discord.MessageEmbed()
			.setTitle(`❌ | 付款失敗！金額不可小於0`)
			.setColor(client.random_color())
			return interaction.reply({embeds: [Embed], ephemeral: true});
		} else if (money === 0) {
			const Embed = new client.discord.MessageEmbed()
			.setTitle(`❌ | 付款失敗！金額不可為0`)
			.setColor(client.random_color())
			return interaction.reply({embeds: [Embed], ephemeral: true});
		}
		if (puserDB.Money[0] < money) {
			const Embed = new client.discord.MessageEmbed()
			.setTitle(`❌ | 付款失敗！您的餘額不足`)
			.setColor(client.random_color())
			return interaction.reply({embeds: [Embed], ephemeral: true});
		}
		var old_num = userDB.Money[0];
		var pold_num = puserDB.Money[0];
		userDB.Money[0] = userDB.Money[0] + money;
		userDB.save();
		puserDB.Money[0] = puserDB.Money[0] - money;
		puserDB.save();
		logDB.log.push({ before: old_num, after: userDB.Money[0], reason: "使用者收款", user: true, userid: user.id, time: Math.floor(Date.now() / 1000) })
		logDB.save();
		plogDB.log.push({ before: pold_num, after: puserDB.Money[0], reason:  "使用者付款", user: true, userid: user2.id, time: Math.floor(Date.now() / 1000) })
		plogDB.save();
		const row = new client.discord.MessageActionRow().addComponents(
			new client.discord.MessageButton()
			.setLabel("付款者交易紀錄")
			.setEmoji("💸")			
			.setCustomId(`money-log-${user.id}`)
			.setStyle("SUCCESS"),
			new client.discord.MessageButton()
			.setLabel("受款者交易紀錄")
			.setEmoji("💵")			
			.setCustomId(`money-log-${user2.id}`)
			.setStyle("SUCCESS")
		)
		const Embed = new client.discord.MessageEmbed()
		.setTitle(`成功付款給${user.username}`)
		.setDescription(`您的餘額\`${puserDB.Money[0]}\`，收款者餘額\`${userDB.Money[0]}\``)
		.setColor(client.random_color())
		return interaction.reply({embeds: [Embed], components: [row]});
	},
};