module.exports = {
	name: "modalSubmit",
  async execute(client, interaction) {
		if(interaction.customId === 'greennoname'){
			// const channel = client.channels.fetch("");
			const context = interaction.getTextInputValue('textinput')
			let Embed = new client.discord.MessageEmbed()
			.setTitle(`投稿文件`)
			.setDescription(context)
			.setColor(client.random_color())
		
			const row = new client.discord.MessageActionRow().addComponents(
				new client.discord.MessageButton()
				.setLabel("填寫新的匿名")
				.setEmoji("📑")		
				.setCustomId(`noname`)
				.setStyle("SUCCESS"),
			);
			// channel.send({embeds: [Embed], components: [row],})
			const channel = await client.channels.fetch("955871899014029322");
			await channel.send({embeds:[Embed]});
			await interaction.deferReply({ ephemeral: true })
    	interaction.followUp({ content: '⭕｜感謝你沒用的匿名回報｜完全沒有任何幫助', ephemeral: true })
			
		}
	}
}