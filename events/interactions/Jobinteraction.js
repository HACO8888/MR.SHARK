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
			.setTitle(`${interaction.user.tag}的背包`)
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
		}
	}
}
