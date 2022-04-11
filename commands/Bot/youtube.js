const { DiscordTogether } = require('discord-together');
module.exports = {
	name: 'youtube',
	usage: `sh!youtube`,
	category: "一般",
	description: '開啟Discord Playtogether功能',
	run: async (client, message, args) => {
		if(message.member.voice.channel) {
			client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
				return message.channel.send(`${invite.code}`);
			});
		};
	}
}