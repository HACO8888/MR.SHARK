const USERS = require(`${process.cwd()}/models/users`)
const MINE = require(`${process.cwd()}/models/mine`)
module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
		if (!interaction.isButton()) return;
		if (interaction.customId.startsWith("make_stone_pickaxe_") || interaction.customId.startsWith("make_iron_pickaxe_") || interaction.customId.startsWith("make_gold_pickaxe_") || interaction.customId.startsWith("make_diamond_pickaxe_") || interaction.customId.startsWith("make_netherite_pickaxe_")){
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
			if (interaction.customId !== `make_stone_pickaxe_${member.id}` && interaction.customId !== `make_iron_pickaxe_${member.id}` && interaction.customId !== `make_gold_pickaxe_${member.id}` && interaction.customId !== `make_diamond_pickaxe_${member.id}` && interaction.customId !== `make_netherite_pickaxe_${member.id}`) {
				const Embed = new client.discord.MessageEmbed()
				.setTitle("❌ | 請不要亂戳來路不明的按鈕")
				.setColor(client.random_color())
				return interaction.reply({embeds: [Embed], ephemeral: true})
			}
			if (interaction.customId === `make_stone_pickaxe_${member.id}`) {
				if (mineDB.Wood < 50 && mineDB.Cobblestone >= 5) {
					const Embed = new client.discord.MessageEmbed()
					.setTitle(`❌ | 合成失敗！您還缺少${50 - mineDB.Wood}個木頭！使用\`/mine\`去挖礦吧！`)
					.setColor(client.random_color())
					return interaction.update({embeds: [Embed], components: []})
				} else if (mineDB.Wood >= 50 && mineDB.Cobblestone < 5) {
					const Embed = new client.discord.MessageEmbed()
					.setTitle(`❌ | 合成失敗！您還缺少${5 - mineDB.Cobblestone}個石頭！使用\`/mine\`去挖礦吧！`)
					.setColor(client.random_color())
					return interaction.update({embeds: [Embed], components: []})
				} else if (mineDB.Wood < 50 && mineDB.Cobblestone < 5) {
					const Embed = new client.discord.MessageEmbed()
					.setTitle(`❌ | 合成失敗！您還缺少${50 - mineDB.Wood}個木頭和${5 - mineDB.Cobblestone}個石頭！使用\`/mine\`去挖礦吧！`)
					.setColor(client.random_color())
					return interaction.update({embeds: [Embed], components: []})
				} else {
					const Embed = new client.discord.MessageEmbed()
					.setTitle("<a:whathype:795679924433977354> 製作中請稍後...")
					.setColor(client.random_color())
					interaction.update({embeds: [Embed], components: [], ephemeral: true})
					setTimeout(function(){
						mineDB.Wood = mineDB.Wood - 50;
						mineDB.Cobblestone = mineDB.Cobblestone - 5;
						mineDB.Stone_Pickaxe = true;
						mineDB.save();
						const Embed2 = new client.discord.MessageEmbed()
						.setTitle(`⭕ | 合成成功！成功合成出高科技石鎬！使用\`/mine\`來挖礦吧！`)
						.setColor(client.random_color())
						interaction.editReply({embeds: [Embed2]})
					}, 10000)
					return;
				}
			}
		}
	} 
}
