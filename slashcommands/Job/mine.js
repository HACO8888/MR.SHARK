const USERS = require(`${process.cwd()}/models/users`);
const MINE = require(`${process.cwd()}/models/mine`);
module.exports = {
  name: "mine",
  usage: "/mine",
  category: "職業",
  description: "礦工工作指令",
  run: async (client, interaction) => {
		if(interaction.member.id !== '508964901415550976' && interaction.member.id !== '536445172247167016' && interaction.channel.id !== "950048724132974652") {
			return interaction.reply("❌開發中...")
		} 
		var Stone = false;
		var Stone_L = "已解鎖";
		var Iron = false;
		var Iron_L = "已解鎖";
		var Gold = false;
		var Gold_L = "已解鎖";
	 	var Diamond = false;
		var Diamond_L = "已解鎖";
		var Netherite = false;
		var Netherite_L = "已解鎖";
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
      .setTitle("❌ | 你不是礦工所以不能使用這個指令")
      .setColor(client.random_color())
			return interaction.reply({ embeds: [Embed]});
    } else {
			
			//宣告按鈕陣列
			const row = new client.discord.MessageActionRow().addComponents(
				new client.discord.MessageButton()
				.setLabel("木鎬")
				.setEmoji("<:Wood_Pickaxe:955461806271393793>")			
				.setCustomId(`wood_pickaxe_${interaction.member.id}`)
				.setStyle("SUCCESS")
				.setDisabled(false),
			)
			const row2 = new client.discord.MessageActionRow()
			
			//判斷是否有鎬子
			if (mineDB.Stone_Pickaxe === false) {
				Stone = true;
				Stone_L = "未解鎖"
			} else {
				row.addComponents(
					new client.discord.MessageButton()
					.setLabel("石鎬")
					.setEmoji("<:Stone_Pickaxe:955461858683416636>")			
					.setCustomId(`stone_pickaxe_${interaction.member.id}`)
					.setStyle("SUCCESS")
					.setDisabled(Stone),
				)
			}
			if (mineDB.Iron_Pickaxe === false) {
				Iron = true;
				Iron_L = "未解鎖"
			} else {
				row.addComponents(
					new client.discord.MessageButton()
					.setLabel("鐵鎬")
					.setEmoji("<:Iron_Pickaxe:955461926815662092>")			
					.setCustomId(`iron_pickaxe_${interaction.member.id}`)
					.setStyle("SUCCESS")
					.setDisabled(Iron),
				)
			}
			if (mineDB.Gold_Pickaxe === false) {
				Gold = true;
				Gold_L = "未解鎖"
			} else {
				row2.addComponents(
					new client.discord.MessageButton()
					.setLabel("黃金鎬")
					.setEmoji("<:Gold_Pickaxe:955462176418717716>")			
					.setCustomId(`gold_pickaxe_${interaction.member.id}`)
					.setStyle("SUCCESS")
					.setDisabled(Gold),
				)
			}
			if (mineDB.Diamond_Pickaxe === false) {
				Diamond = true;
				Diamond_L = "未解鎖"
			} else {
				row2.addComponents(
					new client.discord.MessageButton()
					.setLabel("鑽石鎬")
					.setEmoji("<:Diamond_Pickaxe:955462366823342100>")			
					.setCustomId(`diamond_pickaxe_${interaction.member.id}`)
					.setStyle("SUCCESS")
					.setDisabled(Diamond),
				)
			}
			if (mineDB.Netherite_Pickaxe === false) {
				Netherite = true;
				Netherite_L = "未解鎖"
			} else {
				row2.addComponents(
					new client.discord.MessageButton()
					.setLabel("獄髓鎬")
					.setEmoji("<:Netherite_Pickaxe:958389007576870912>")			
					.setCustomId(`netherite_pickaxe_${interaction.member.id}`)
					.setStyle("SUCCESS") 	
					.setDisabled(Netherite),
				)
			}
			const Embed = new client.discord.MessageEmbed()
      .setTitle("歡迎來到礦工的世界")
      .setDescription("請選擇要用來挖礦的工具")
			.addFields(
				{name: "<:Wood_Pickaxe:955461806271393793>木鎬 <a:arrow:815255913953755216> 已解鎖", value: "\u200b"},
				{name: `<:Stone_Pickaxe:955461858683416636>石鎬 <a:arrow:815255913953755216> ${Stone_L}`, value: "\u200b"},
				{name: `<:Iron_Pickaxe:955461926815662092>鐵鎬 <a:arrow:815255913953755216> ${Iron_L}`, value: "\u200b"},
				{name: `<:Gold_Pickaxe:955462176418717716>黃金鎬 <a:arrow:815255913953755216> ${Gold_L}`, value: "\u200b"},
				{name: `<:Diamond_Pickaxe:955462366823342100>鑽石鎬 <a:arrow:815255913953755216> ${Diamond_L}`, value: "\u200b"},
				{name: `<:Netherite_Pickaxe:958389007576870912>獄髓鎬 <a:arrow:815255913953755216> ${Netherite_L}`, value: "\u200b"},
			)
      .setColor(client.random_color())
      .setTimestamp()
      .setFooter({
        text: client.config.embedfooterText,
        iconURL: client.user.avatarURL(),
      });
			if (mineDB.Gold_Pickaxe === false) {
				return interaction.reply({ embeds: [Embed], components: [row]});
			} else {
				return interaction.reply({ embeds: [Embed], components: [row, row2]});
			}
		}
  },
};
