const { Modal, TextInputComponent, showModal } = require('discord-modals')
module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
		if (!interaction.isButton()) return;
		if (interaction.customId === `open-report-form`) {
			const modal = new Modal()
			.setCustomId('modal-report-form')
			.setTitle('MR.SHARK的回饋單!')
			.addComponents([
				new TextInputComponent()
				.setCustomId('textinput-report1')
				.setLabel('請輸入要回饋的標題')
				.setStyle('SHORT')
				.setMinLength(3)
				.setMaxLength(20)
				.setPlaceholder('help指令錯誤回報...')
				.setRequired(true),
				new TextInputComponent()
				.setCustomId('textinput-report2')
				.setLabel('請詳細敘述回饋內容')
				.setStyle('LONG')
				.setMinLength(10)
				.setMaxLength(500)
				.setPlaceholder('這機器人真是好用...')
				.setRequired(true)
			]);
			showModal(modal, {
				client: client,
				interaction: interaction
			})
		}
	}
}
