module.exports = {
  name: "messageReactionAdd",
  async execute(client, reaction, user) {
		// if (reaction.partial) {
		// 	try {
		// 		await reaction.fetch();
		// 	} catch (error) {
		// 		console.error('在讀取emoji的時候出錯了:', error);
		// 		return;
		// 	}
		// }
		if (reaction.message.guildId === "773205132472877090" && reaction.message.channelId === "953653075430752307" && reaction.emoji.name === '✅') {
			reaction.message.guild.members.cache.get(user.id).roles.add("953653175104200784");
			return;
		} else {
			return;
		}
	}
}

