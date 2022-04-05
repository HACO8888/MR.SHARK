const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const USERS = require(`${process.cwd()}/models/users`)

module.exports = {
	name: "ready",
  once: true,
	async execute(client) {
		// client.users.cache.forEach((user) => {
		// 	var userDB = USERS.findOne({ userID: user.id });
		// 	// console.log(userDB)
		// 	// if (!userDB) {
		// 		const NewuserDB = new USERS({
		// 			userID: user.id,
		// 			Money: [0,0,0,0,0],
		// 			level: [0,0],
		// 			item: [""],
		// 			marry: "NOPE",
		// 			premium: false,
		// 		})
		// 		NewuserDB.save();
		// 	// }
		// })

		
		require(`${process.cwd()}/dashboard/server`)(client)
	  client.user.setActivity(`使用/help來獲取幫助`, { type: "PLAYING" });
	  client.log(`${client.user.tag} is now \x1B[1;32monline\x1B[0m! Serving in \x1B[1;31m${client.guilds.cache.size}\x1B[0m servers! Serving \x1B[1;31m${client.users.cache.size}\x1B[0m users!`);
		// client.guilds.cache.forEach(guild => {
		// 	client.log(`${guild.name}(${guild.id})`, "\x1B[0;33m")
		// })

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
			try {
				guild.commands.set([])
			} catch (error) {
				client.log(`有個伺服器不支援Slash Command => ${guild.name}(${guild.id})(${guild.owner.name})`);
			}
		})
		await client.application.commands.set(arrayOfSlashCommands);
		// client.guilds.cache.forEach(guild => {
		// 	if(guild.id === "773205132472877090") {
		// 		guild.commands.set([]);
		// 		guild.commands.set(arrayOfSlashCommands);
		// 	}
		// })
  }
}