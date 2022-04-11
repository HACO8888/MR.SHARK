const USERS = require(`${process.cwd()}/models/users`);
const MINE = require(`${process.cwd()}/models/mine`);
module.exports = {
  name: "bag",
  usage: "/bag",
  category: "職業",
  description: "查看背包的指令",
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
		const Embed = new client.discord.MessageEmbed()
		.setAuthor(`${user.username} 的背包`, interaction.member.displayAvatarURL({ dynamic: true }))
		.setColor(client.random_color())
		.setTimestamp()
		.setFooter({
			text: client.config.embedfooterText,
			iconURL: client.user.avatarURL(),
		});
		if (mineDB.Wood && mineDB.Wood !== 0) {
			Embed.addFields({name: "木頭", value:`${mineDB.Wood.toString()}個`})
		}
		if (mineDB.Cobblestone !== 0) {
			Embed.addFields({name: "石頭", value:`${mineDB.Cobblestone.toString()}個`})
		}
		interaction.reply({embeds: [Embed], components: []})
  },
};
