module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
		if (!interaction.guild){
			await interaction.reply("機器人目前不支援私訊使用指令")
			return;		
		}
	  if (interaction.isCommand()) {
	    // await interaction.deferReply({ ephemeral: false }).catch(() => {});
	
	    const command = client.slashCommands.get(interaction.commandName);
	    if (!command) return interaction.channel.send({ content: "這指令不存在或是已經過期了" });
	
	    const args = [];
			
	    for (let option of interaction.options.data) {
	      if (option.type === "SUB_COMMAND") {
	        if (option.name) args.push(option.name);
	        option.options?.forEach((x) => {
	          if (x.value) args.push(x.value);
	        });
	      } else if (option.value) args.push(option.value);
	    }
	    try {
	      command.run(client, interaction, args);
				return;
	    } catch (e) {
	      interaction.channel.send(e.message );
				return;
	    }
	  }
	}
}
