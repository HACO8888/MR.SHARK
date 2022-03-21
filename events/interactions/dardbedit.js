const USERS = require(`${process.cwd()}/models/darjob`)
module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
		if (!interaction.isButton()) return;
    if (interaction.guildId === `747765361302044732`) {
			if(interaction.customId === 'dar-delete-job-db-y'){
				return;
			}
		}
	}
}