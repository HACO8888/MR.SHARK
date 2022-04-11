const USERS = require(`${process.cwd()}/models/users`)
const LOG = require(`${process.cwd()}/models/moneylog`)
module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
		if (!interaction.isButton()) return;
		if (interaction.customId.startsWith("money-log-")) {
			var user;
			interaction.guild.members.cache.forEach(async member => {
				if (interaction.customId === `money-log-${member.id}`) {
					user = member.user
				}
			})
			var logDB = await LOG.findOne({ userID: user.id });
			if (!logDB) {
				const NewlogDB = new LOG({
					userID: user.id,
					log: [],
				})
				await NewlogDB.save();
				logDB = await LOG.findOne({ userID: user.id });
			}
			const Embed = new client.discord.MessageEmbed()
			.setAuthor({name:`${user.username} 的資產`, iconURL: user.displayAvatarURL({ dynamic: true })})
			.setColor(client.random_color())
			.setTimestamp()
			.setFooter({
				text: client.config.embedfooterText,
				iconURL: client.user.avatarURL(),
			});
			const log = [];
			if (logDB.log.length <= 10) {
				for (let i = logDB.log.length; i > 0; i--) {
					var j = i - 1 
					if (logDB.log[j].user === false) {
						if (logDB.log[j].userid === "systemset" || logDB.log[j].userid === "systemreset") {
							log.push(`【<t:${logDB.log[j].time}:R>】 ${logDB.log[j].reason}把你的錢變為\`$${logDB.log[j].after.toString()}\``)
						} else if (logDB.log[j].userid === "systemadd") {
							log.push(`【<t:${logDB.log[j].time}:R>】 ${logDB.log[j].reason}\`$${(logDB.log[j].after - logDB.log[j].before).toString()}\`把你的錢變為\`${logDB.log[j].after.toString()}\`元`)
						} else if (logDB.log[j].userid === "systemremove") {
							log.push(`【<t:${logDB.log[j].time}:R>】 ${logDB.log[j].reason}\`$${(logDB.log[j].before - logDB.log[j].after).toString()}\`把你的錢變為\`${logDB.log[j].after.toString()}\`元`)
						} else {
							log.push(`【<t:${logDB.log[i].time}:R>】 錯誤的款項紀錄`)
						}
					} else {
						if (logDB.log[i].reason === "使用者收款") {
							log.push(`【<t:${logDB.log[j].time}:R>】 收到\`$${(logDB.log[j].after - logDB.log[j].before).toString()}\`來自<@${logDB.log[j].userid}>`)
						} else if (logDB.log[i].reason === "使用者付款") {
							log.push(`【<t:${logDB.log[j].time}:R>】 付款\`$${(logDB.log[j].before - logDB.log[j].after).toString()}\`給<@${logDB.log[j].userid}>`)
						} else {
							log.push(`【<t:${logDB.log[i].time}:R>】 錯誤的款項紀錄，請截圖傳並回報`)
						}
					}
				}
			} else {
				var i = logDB.log.length - 1;
				for (let r = 10; r > 0; r--) {
					if (logDB.log[i].user === false) {
						if (logDB.log[i].userid === "systemset" || logDB.log[i].userid === "systemreset") {
							log.push(`【<t:${logDB.log[i].time}:R>】 ${logDB.log[i].reason}把你的錢變為\`$${logDB.log[i].after.toString()}\``)
						} else if (logDB.log[i].userid === "systemadd") {
							log.push(`【<t:${logDB.log[i].time}:R>】 ${logDB.log[i].reason}\`$${(logDB.log[i].after - logDB.log[i].before).toString()}\`把你的錢變為\`${logDB.log[i].after.toString()}\`元`)
						} else if (logDB.log[i].userid === "systemremove") {
							log.push(`【<t:${logDB.log[i].time}:R>】 ${logDB.log[i].reason}\`$${(logDB.log[i].before - logDB.log[i].after).toString()}\`把你的錢變為\`${logDB.log[i].after.toString()}\`元`)
						} else {
							log.push(`【<t:${logDB.log[i].time}:R>】 錯誤的款項紀錄，請截圖並回報`)
						}
					} else {
						if (logDB.log[i].reason === "使用者收款") {
							log.push(`【<t:${logDB.log[i].time}:R>】 收到\`$${(logDB.log[i].after - logDB.log[i].before).toString()}\`來自<@${logDB.log[i].userid}>`)
						} else if (logDB.log[i].reason === "使用者付款") {
							log.push(`【<t:${logDB.log[i].time}:R>】 付款\`$${(logDB.log[i].before - logDB.log[i].after).toString()}\`給<@${logDB.log[i].userid}>`)
						} else {
							log.push(`【<t:${logDB.log[i].time}:R>】 錯誤的款項紀錄`)
						}
					} 
					i--;
				}
			}
			Embed.setDescription(log.toString().replaceAll(",", "\n"))
			interaction.reply({embeds: [Embed], ephemeral: true})
		}
	}
}
