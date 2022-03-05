const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
		if (!interaction.isButton()) return;
		if (!interaction.guildId === "806477754681262100" || !interaction.guildId === "929211779718983690") return;
		
		interaction.guild.members.cache.forEach(member => {
			if (interaction.customId === `rxsetup-yes?id=${member.id}`) {
				if (interaction.guildId === "806477754681262100"){
					member.roles.add("949002064388845622")
				} else if (interaction.guildId === "929211779718983690") {
					member.roles.add("929596933180362812")
				}
				
				const row = new client.discord.MessageActionRow().addComponents(
					new client.discord.MessageButton()
						.setLabel("邀請我")
						.setStyle("LINK")
						.setURL("https://discord.com/api/oauth2/authorize?client_id=940285138393239573&permissions=8&scope=bot%20applications.commands"),
					new client.discord.MessageButton()
						.setLabel("支援群")
						.setStyle("LINK")
						.setURL("https://discord.gg/RtsckgRjqJ")
				);
				const data = new MessageEmbed().setTitle("審核成功，感謝您使用本系統").setColor(client.random_color())
				interaction.reply({ embeds: [data], components: [row] })
			} else if (interaction.customId === `rxsetup-no?id=${member.id}`) {
				const row = new client.discord.MessageActionRow().addComponents(
      			new client.discord.MessageButton()
	        		.setLabel("邀請我")
	        		.setStyle("LINK")
	        		.setURL("https://discord.com/api/oauth2/authorize?client_id=940285138393239573&permissions=8&scope=bot%20applications.commands"),
      			new client.discord.MessageButton()
	        		.setLabel("支援群")
	        		.setStyle("LINK")
	        		.setURL("https://discord.gg/RtsckgRjqJ")
    			);
					const data = new MessageEmbed().setTitle("審核成功，感謝您使用本系統").setColor(client.random_color())
					interaction.reply({ embeds: [data], components: [row] })
			}
		})
	}
}