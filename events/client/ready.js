const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const USERS = require(`${process.cwd()}/models/users`)

module.exports = {
	name: "ready",
  	once: true,
	async execute(client) {	
	  client.user.setActivity(`使用/help來獲取幫助`, { type: "PLAYING" });
	  client.log(`${client.user.tag} is now \x1B[1;32monline\x1B[0m! Serving in \x1B[1;31m${client.guilds.cache.size}\x1B[0m servers! Serving \x1B[1;31m${client.users.cache.size}\x1B[0m users!`);

	  const slashCommands = await globPromise(
	    `${process.cwd()}/slashcommands/**/*.js`
	  );

  	const arrayOfSlashCommands = [];
	slashCommands.map((value) => {
		const file = require(value);
		if (!file.name) return;
		arrayOfSlashCommands.push(file);
	});
	
	client.guilds.cache.forEach(guild => {
		guild.commands.set([])
		guild.commands.set(arrayOfSlashCommands);
	})
  }
}