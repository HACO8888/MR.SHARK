const USERS = require(`${process.cwd()}/models/users`)
const MINE = require(`${process.cwd()}/models/mine`)
module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
		if (!interaction.isButton()) return;
		if (interaction.customId.startsWith("wood_pickaxe_") || interaction.customId.startsWith("stone_pickaxe_") || interaction.customId.startsWith("iron_pickaxe_") || interaction.customId.startsWith("gold_pickaxe_") || interaction.customId.startsWith("diamond_pickaxe_") || interaction.customId.startsWith("netherite_pickaxe_")){
			const member = interaction.member;
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
			if (interaction.customId !== `wood_pickaxe_${member.id}` && interaction.customId !== `stone_pickaxe_${member.id}` && interaction.customId !== `iron_pickaxe_${member.id}` && interaction.customId !== `gold_pickaxe_${member.id}` && interaction.customId !== `diamond_pickaxe_${member.id}` && interaction.customId !== `netherite_pickaxe_${member.id}`) {
				const Embed = new client.discord.MessageEmbed()
				.setTitle("❌ | 請不要亂戳來路不明的按鈕")
				.setColor(client.random_color())
				return interaction.reply({embeds: [Embed], ephemeral: true})
			}
			if (interaction.customId === `wood_pickaxe_${member.id}`) {
				const Embed = new client.discord.MessageEmbed()
				.setTitle("<a:Mining:960906028382298183> 挖掘中請稍後...")
				.setColor(client.random_color())
				interaction.update({embeds: [Embed], components: [], ephemeral: true})
				setTimeout(function(){ 
					var get_wood = Math.floor(Math.random()*100) + 1;
					var get_stone = Math.floor(Math.random()*100) + 1;
					var wood;
					var stone;
					if (get_wood <= 30) { //30%會獲的2個木頭
						wood = 2
						mineDB.Wood += wood;
					} else if (get_wood > 30 && get_wood <= 80) { //50%會獲的1個木頭
						wood = 1
						mineDB.Wood += wood; 
					} else { //20%會獲的0個木頭
						wood = 0
					}
					if (get_stone <= 30 ){ //30%會獲的1個木頭
						stone = 1
						mineDB.Cobblestone += stone;
					} else { //70%會獲的0個木頭
						stone = 0
					}
					mineDB.save();
					const Embed2 = new client.discord.MessageEmbed()
					.setTitle(`🥳 恭喜${interaction.user.tag}挖礦成功`)
					.setDescription(`以下是您挖到的礦物喔！您可以使用背包按鈕查看所有物品！`)
					.addFields({name: "木頭", value: `${wood.toString()}個`, inline:true}, {name: "石頭", value: `${stone.toString()}個`, inline:true})
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
					interaction.editReply({embeds: [Embed2], components: [row]})
				}, 10000);			
			} else if (interaction.customId === `stone_pickaxe_${member.id}`) {
					const Embed2 = new client.discord.MessageEmbed()
					.setTitle(`❌ | 開發中，如果您已經有這稿子表示您已經到遊戲盡頭了喔！`)
					.setColor(client.random_color())
				return interaction.editReply({embeds: [Embed2], components: [row]})
			}
		}
	} 
}
