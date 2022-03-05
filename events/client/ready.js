module.exports = {
	name: "ready",
  once: true,
	async execute(client) {
		require('../../dashboard/server')(client)
	  client.user.setActivity(`使用/help來獲取幫助`, { type: "PLAYING" });
	  client.log(`${client.user.tag} is now \x1B[1;32monline\x1B[0m! Serving in \x1B[1;31m${client.guilds.cache.size}\x1B[0m servers! Serving \x1B[1;31m${client.users.cache.size}\x1B[0m users!`);
		// client.guilds.cache.forEach(guild => {
		// 	client.log(`${guild.name}(${guild.id})`, "\x1B[0;33m")
		// })
  }
}