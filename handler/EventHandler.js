const glob = require("glob");

module.exports = function (client) {
  const eventFiles = glob.sync("./events/**/*.js");
  client.logger.info("EVENTS", `Loading ${eventFiles.length} events...`);
  
  eventFiles.forEach((file) => {
    const event = require(`../${file}`);

    if (!event.execute) {
      client.logger.error(`error`, `Execute function is required for events! (${file})`);
    }

    if (!event.name) {
      client.logger.error(`error`, `Name is required for events! (${file})`);
    }

		if (event.once) {
      client.once(event.name, event.execute.bind(null, client));
    } else {
      client.on(event.name, event.execute.bind(null, client));
    }

    delete require.cache[require.resolve(`../${file}`)];

    client.logger.debug(`EVT DEBUG`, `Loaded ${event.name}.js`);

  });
};