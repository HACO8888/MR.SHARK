const { Permissions } = require('discord.js');
module.exports = {
	name: 'youtube',
	usage: `/youtube`,
	category: "一般",
	description: '開啟Discord Playtogether功能',
  run: async (client, interaction) => {
		if(!interaction.member.voice.channel) {
			return interaction.reply(`❌ | 請先加入語音頻道喔`);
		}
		interaction.guild.roles.everyone.setPermissions("549755813888");
		interaction.member.voice.channel.permissionOverwrites.set([
			{
				id: interaction.guild.id,
				allow: "549755813888",
			},
		]);
		if(interaction.member.voice.channel) {
			client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
				return interaction.reply(`${invite.code}`);
			});
		};
  },
};
