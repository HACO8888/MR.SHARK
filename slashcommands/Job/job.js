const USERS = require(`${process.cwd()}/models/users`);
module.exports = {
  name: "job",
  usage: "/job",
  category: "職業",
  description: "查看和選取職業",
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
		const Embed = new client.discord.MessageEmbed()
		.setAuthor({name:`${user.username}的職業護照`, iconURL: user.displayAvatarURL({ dynamic: true })})
		.setColor(client.random_color())
		.setTimestamp()
		.setFooter({
			text: client.config.embedfooterText,
			iconURL: client.user.avatarURL(),
		});
		if (userDB.job === "NOPE") {
			Embed.setDescription(`請選擇您要的職業，請謹慎挑選`)
		} else if(userDB.job === "miner"){
			Embed.setDescription(`您的職業是\`礦工\`，如果選擇新的職業，所有職業數據將會刷新`)
		}
		const row = new client.discord.MessageActionRow().addComponents(
			new client.discord.MessageButton()
			.setLabel("礦工")
			.setEmoji("<:Mining:960906028382298183>")			
			.setCustomId(`choose_job_miner_${interaction.user.id}`)
			.setStyle("SUCCESS")
			.setDisabled(false),
		)
		return interaction.reply({ embeds: [Embed], components: [row]});
  },
};
