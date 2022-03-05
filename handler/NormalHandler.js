const mongoose = require("mongoose");

module.exports = async (client) => {
	mongoose.connect(process.env['DB'], {
	  useNewUrlParser: true,
	  useUnifiedTopology: true},(err) => {
	  if (err) return console.error(err);
	  client.log("MongoDB Connect Successed", "\x1B[1;34m")
	})
	
 //  const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
 //  commandFiles.map((value) => {
 //    const file = require(value);
 //    const splitted = value.split("/");
 //    const directory = splitted[splitted.length - 2];

 //    if (file.name) {
 //      const properties = { directory, ...file };
 //      client.commands.set(file.name, properties);
 //    }
 //  });

 //  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
 //  eventFiles.map((value) => require(value));

 //  const slashCommands = await globPromise(
 //    `${process.cwd()}/slashcommands/**/*.js`
 //  );
	
	// const eventFiles2 = glob1.sync(`${process.cwd()}/events/player/*.js`);
	// eventFiles2.forEach((file) => {
 //    const event = require(file);

 //    let type = "client";
 //    if (file.includes("player.")) type = "player";

 //    if (type === "player") {
 //      client.player.on(event.name, event.execute.bind(null, client));
 //    } else if (event.once) {
 //      client.once(event.name, event.execute.bind(null, client));
 //    } else {
 //      client.on(event.name, event.execute.bind(null, client));
 //    }
	// 	delete require.cache[require.resolve(file)];
	// 	client.logger.debug(`Loaded ${event.name}.js`);
 //  });


 //  const arrayOfSlashCommands = [];
 //  slashCommands.map((value) => {
 //    const file = require(value);
 //    if (!file.name) return;
 //    client.slashCommands.set(file.name, file);
 //    arrayOfSlashCommands.push(file);
 //  });

 //  client.on("ready", async () => {
	// 	client.guilds.cache.forEach(guild => {
	// 		try {
	// 			guild.commands.set([])
	// 		} catch (error) {
	// 			client.log(`有個伺服器不支援Slash Command => ${guild.name}(${guild.id})(${guild.owner.name})`);
	// 		}
	// 	})
	// 	await client.application.commands.set(arrayOfSlashCommands);
 //  });
};
