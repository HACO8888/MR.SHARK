const { Modal, TextInputComponent, showModal } = require('discord-modals')
module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
		if (!interaction.isButton()) return;
		if (interaction.customId === `greennoname`) {
			const modal = new Modal()
			.setCustomId('greennoname')
			.setTitle('鳴噤黨匿名填報單!')
			.addComponents([
				new TextInputComponent()
				.setCustomId('textinput')
				.setLabel('請輸入要傳送的內容')
				.setStyle('LONG')
				.setMinLength(1)
				.setMaxLength(1000)
				.setPlaceholder('ㄟ嘿嘿...')
				.setRequired(true),
			]);
			showModal(modal, {
				client: client,
				interaction: interaction
			})
		}
	}
}
