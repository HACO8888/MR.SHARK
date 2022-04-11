const USERS = require(`${process.cwd()}/models/users`);
const MINE = require(`${process.cwd()}/models/mine`);
module.exports = {
  name: "upgrade",
  usage: "/upgrade [要升級的東西]",
  category: "職業",
  description: "所有職業升級指令",
  run: async (client, interaction) => {
		const user = interaction.user
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
		} else if (!userDB.job) {
			userDB.job = "NOPE";
			userDB.save();
		}
		var mineDB = await MINE.findOne({ userID: user.id });
		if (!mineDB) {
			const NewmineDB = new MINE({
				userID: user.id,
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
			mineDB = await MINE.findOne({ userID: user.id });
		}
		if (userDB.job === "NOPE") {
			const Embed = new client.discord.MessageEmbed()
			.setTitle("❌ | 你沒有職業所以不能使用這個指令")
			.setColor(client.random_color())
			return interaction.reply({ embeds: [Embed]});
		} else if (userDB.job === "miner") {
			var count = 0;
			const row = new client.discord.MessageActionRow()
			if (mineDB.Stone_Pickaxe === false) {
				count += 1;
				row.addComponents(
					new client.discord.MessageButton()
					.setLabel("石鎬")
					.setEmoji("<:Stone_Pickaxe:955461858683416636>")			
					.setCustomId(`make_stone_pickaxe_${interaction.member.id}`)
					.setStyle("SUCCESS")
				)
			}
			const Embed = new client.discord.MessageEmbed()
			.setTitle(`⚒️ ${interaction.user.tag}歡迎來到超級科技化的合成台`)
			.setDescription(`請選擇您要合成的高科技物品！您可以合成${count.toString()}項東西！`)
			.setColor(client.random_color())
			if (count === 0) {
				interaction.reply({embeds: [Embed], components: [], ephemeral: false})
			} else {
				interaction.reply({embeds: [Embed], components: [row], ephemeral: false})
			}
		}
	}
}