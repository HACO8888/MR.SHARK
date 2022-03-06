module.exports = {
  name: "show",
  usage: "sh!report <要回報的內容>",
  category: "Bot",
  description: "回報機器人問題或是給予建議!",
  run: async (client, message) => {
		message.guild.members.cache.forEach(member => {
      if (!member.user.bot) {
        msg.reply(member.user.username);
			}
    });
	}
}