const USERS = require(`${process.cwd()}/models/users`);
const MINE = require(`${process.cwd()}/models/mine`);
module.exports = {
  name: "upgrade",
  usage: "/upgrade [要升級的東西]",
  category: "職業",
  description: "所有職業升級指令",
  run: async (client, interaction) => {
		if(interaction.member.id !== '508964901415550976' && interaction.member.id !== '536445172247167016') {
			return interaction.reply("❌開發中...")
		} 
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
			return
		}
	}
}