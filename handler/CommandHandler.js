const glob = require("glob");
const chalk = require('chalk')
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = async function loadCommands(client) {

	const commandFiles1 = await globPromise(`${process.cwd()}/commands/**/*.js`);

	client.logger.info("COMMANDS", `Loading ${commandFiles1.length} PrefixCommands...`)
	
  commandFiles1.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
			client.logger.debug(`CMD DEBUG`, `Loaded ${file.name}.js`);
      client.commands.set(file.name, properties);
    }
  });

	const commandFiles2 = await globPromise(`${process.cwd()}/民主進步黨指令/*.js`);

	client.logger.info("COMMANDS", `Loading ${commandFiles2.length} 民主進步黨指令...`)
	
  commandFiles2.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
			client.logger.debug(`CMD DEBUG`, `Loaded 民主進步黨指令-${file.name}.js`);
      client.民主進步黨指令.set(file.name, properties);
    }
  });
	
  const commandFiles = glob.sync("./slashcommands/**/*.js");

  client.logger.info("COMMANDS", `Loading ${commandFiles.length} slashCommands...`)
	
  for await (const file of commandFiles) {
    const command = require(`../${file}`);

    if (!command.name) {
      client.logger.error(`error`, `Name is required for slashCommands! (${file})`);
    }

    // const data = {
    //   name: command.name,
    //   description: command?.description ?? "這個指令被遺忘了，沒有介紹內容QQ",
    //   options: command?.options ?? []
    // };

    // const cmd = client.application?.commands.cache.find((c) => c.name === command.name);
    // if (!cmd) {
    //   await client.application?.commands.create(data);
    // }


    client.logger.debug(`CMD DEBUG`, `Loaded ${command.name}.js`);

    delete require.cache[require.resolve(`../${file}`)];
    client.slashCommands.set(command.name, command);
  }

};