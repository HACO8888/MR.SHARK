const { Modal, TextInputComponent, showModal } = require('discord-modals')
module.exports = {
  name: "test",
  usage: "/test",
  category: "開發",
  description: "測試指令恩對!",
  run: async (client, interaction) => {
		if(interaction.member.id !== '508964901415550976' && interaction.member.id !== '536445172247167016') {
			return interaction.reply("❌你不是開發人員")
		} 
		const modal = new Modal()
		.setCustomId('modal-report')
		.setTitle('Test of Discord-Modals!')
		.addComponents([
			new TextInputComponent()
		  .setCustomId('textinput-report1')
		  .setLabel('請輸入回饋或回報標題')
		  .setStyle('SHORT')
		  .setMinLength(3)
		  .setMaxLength(20)
		  .setPlaceholder('help指令錯誤回報...')
		  .setRequired(true),
		  new TextInputComponent()
		  .setCustomId('textinput-report2')
		  .setLabel('請輸入您要回饋或是回報的內容')
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
  },
};
