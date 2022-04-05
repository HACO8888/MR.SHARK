const USERS = require(`${process.cwd()}/models/users`)
const MINE = require(`${process.cwd()}/models/mine`)
module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
		if (!interaction.isButton()) return;
		if (interaction.customId.startsWith("wood_pickaxe_")){
			if (interaction.customId !== `wood_pickaxe_${interaction.member.id}`){
				const Embed = new client.discord.MessageEmbed()
				.setTitle("❌ | 請不要亂戳來路不明的按鈕")
				.setColor(client.random_color())
				return interaction.reply({embeds: [Embed], ephemeral: true})
			}
			interaction.guild.members.cache.forEach(async member => {
				if (interaction.customId === `wood_pickaxe_${member.id}`) {
					var mineDB = await MINE.findOne({ userID: member.id });
					if (!mineDB) {
						const NewmineDB = new MINE({
							userID: member.id,
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
						mineDB = await MINE.findOne({ userID: member.id });
					}
					const Embed = new client.discord.MessageEmbed()
	      	.setTitle("⭕ | 挖掘中請稍後...")
					.setColor(client.random_color())
					interaction.update({embeds: [Embed], components: [], ephemeral: true})
					setTimeout(function(){ 
						var get_wood = Math.floor(Math.random()*100) + 1;
						var get_stone = Math.floor(Math.random()*100) + 1;
						var wood;
						var stone;
						if (get_wood <= 10 ){
							wood = 3
							mineDB.Wood += wood;
						} else if (get_wood > 10 && get_wood <= 30) {
							wood = 2
							mineDB.Wood += wood;
						} else if (get_wood > 30 && get_wood <= 80) {
							wood = 1
							mineDB.Wood += wood;
						} else {
							wood = 0
						}
						if (get_stone <= 20 ){
							stone = 1
							mineDB.Cobblestone += stone;
						} else {
							stone = 0
						}
						mineDB.save();
						const Embed2 = new client.discord.MessageEmbed()
		      	.setTitle(`挖掘成功\n挖掘到了\n木頭:\`${wood.toString()}\`個\n石頭:\`${stone.toString()}\`個`)
						.setColor(client.random_color())
						.setTimestamp()
						.setFooter({
							text: client.config.embedfooterText,
							iconURL: client.user.avatarURL(),
						});
						const row = new client.discord.MessageActionRow().addComponents(
							new client.discord.MessageButton()
							.setLabel("查看背包")
							.setEmoji("🎒")			
							.setCustomId(`bag`)
							.setStyle("SUCCESS")
							.setDisabled(false),
						)
						interaction.editReply({embeds: [Embed2], components: [row], ephemeral: true})
					}, 10000);			
				}
			})
		} else {
			return;
		}
	} 
}
