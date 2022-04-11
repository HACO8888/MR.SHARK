const USERS = require(`${process.cwd()}/models/users`)
const MINE = require(`${process.cwd()}/models/mine`)
module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
		if (!interaction.isButton()) return;
		if (interaction.customId === `bag`) {
			var mineDB = await MINE.findOne({ userID: interaction.member.id });
			if (!mineDB) {
				const NewmineDB = new MINE({
					userID: interaction.member.id,
					Netherite_Pickaxe: false,
					Diamond_Pickaxe: false,
					Gold_Pickaxe: false,
					Iron_Pickaxe: false,
					Stone_Pickaxe: false,
					Wood_Pickaxe: true,
					Netherite_Ingot: 0,
					Emerald: 0,
					Diamond: 0,
					Lapis_Lazuli: 0,
					RedstoneDust: 0,
					Gold_Ingot: 0,
					Iron_Ingot: 0,
					Coal: 0,
					Cobblestone: 0,
					Wood: 0,
				})
				await NewmineDB.save();
				mineDB = await MINE.findOne({ userID: interaction.member.id });
			}
			const Embed = new client.discord.MessageEmbed()
			.setAuthor(`${user.username} 的背包`, interaction.member.displayAvatarURL({ dynamic: true }))
			.setColor(client.random_color())
			.setTimestamp()
			.setFooter({
				text: client.config.embedfooterText,
				iconURL: client.user.avatarURL(),
			});
			if (mineDB.Wood && mineDB.Wood !== 0) {
				Embed.addFields({name: "木頭", value:`${mineDB.Wood.toString()}`})
			}
			if (mineDB.Cobblestone !== 0) {
				Embed.addFields({name: "石頭", value:`${mineDB.Cobblestone.toString()}`})
			}
			interaction.reply({embeds: [Embed], ephemeral: true})
		} else {
			if (interaction.customId.startsWith("choose_job_miner_")){
				if (interaction.customId === `choose_job_miner_${interaction.user.id}`){
					var mineDB = await MINE.findOne({ userID: interaction.member.id });
					if (!mineDB) {
						const NewmineDB = new MINE({
							userID: interaction.member.id,
							Netherite_Pickaxe: false,
							Diamond_Pickaxe: false,
							Gold_Pickaxe: false,
							Iron_Pickaxe: false,
							Stone_Pickaxe: false,
							Wood_Pickaxe: true,
							Netherite_Ingot: 0,
							Emerald: 0,
							Diamond: 0,
							Lapis_Lazuli: 0,
							RedstoneDust: 0,
							Gold_Ingot: 0,
							Iron_Ingot: 0,
							Coal: 0,
							Cobblestone: 0,
							Wood: 0,
						})
						await NewmineDB.save();
						mineDB = await MINE.findOne({ userID: interaction.member.id });
					}
					var userDB = await USERS.findOne({ userID: interaction.member.id });
					if (userDB.job === "miner") {
						const Embed = new client.discord.MessageEmbed()
						.setTitle(`❌ | 選擇失敗您已經是\`礦工\`了`)
						return interaction.update({embeds: [Embed], components: []})
					} else {
						userDB.job = "miner";
						userDB.save();
						const Embed = new client.discord.MessageEmbed()
						.setTitle(`⭕ | 選擇成功，歡迎加入\`礦工\`的行列！`)
						return interaction.update({embeds: [Embed], components: []})
					}
				} else {
					const Embed = new client.discord.MessageEmbed()
					.setTitle("❌ | 請不要亂戳來路不明的按鈕")
					.setColor(client.random_color())
					return interaction.reply({embeds: [Embed], ephemeral: true})
				}
			}
		}
	}
}
