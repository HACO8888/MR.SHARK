const { Formatters } = require('discord.js');
module.exports = {
	name: "modalSubmit",
  async execute(client, interaction) {
		if(interaction.customId === 'modal-report-form'){
	    const title = interaction.getTextInputValue('textinput-report1')
			const context = interaction.getTextInputValue('textinput-report2')
	    const channel = await client.channels.fetch(client.config.ReportFormLogChannelId);
			const embed = new client.discord.MessageEmbed()
			.setTitle(`MR.SHARK Report Form Log`)
			.addFields(
				{ name: "User", value: `${interaction.member.user.tag}`, inline: false },
	      { name: "Title", value: `${title}`, inline: false },
				{ name: "Context", value: `${context}`, inline: false },
			)
		  .setTimestamp()
			.setColor(client.random_color())
		  .setFooter({
		    text: client.config.embedfooterText,
		    iconURL: client.user.avatarURL(),
		  });
			channel.send({ embeds: [embed] })
			await  interaction.deferReply ( {  ephemeral : true  } ) 
			interaction.followUp({ content: '⭕ ｜ 成功填寫回饋與回報單，您寶貴的意見會成為我們日後進步的條件!', ephemeral: true  })
  	}	  
	}
}