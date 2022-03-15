
module.exports = {
	name: 'test',
	usage: `sh!test`,
	category: "開發",
	description: '測試指令',
	run: async (client, message, args) => {
    if(message.author.id !== '536445172247167016' && message.author.id !== '508964901415550976') return message.reply('❌你不是開發人員'); 
	}
}