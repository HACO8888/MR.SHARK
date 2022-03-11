const glob = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = {
    name: 'reload',
    aliasses: ['restart', 'rl'],
    usage: `sh!reload`,
	  category: "開發",
    description: '重新讀取所有指令',
  	run: async (client, message, args) => {
    if(!message.author.id === `536445172247167016` || !message.author.id === `508964901415550976`) return message.channel.send('You are not a Dev');     
		
		client.commands.clear();
		client.slashCommands.clear();
		client.removeAllListeners();
			
		const eventFiles = await globPromise(`${process.cwd()}/events/**/*.js`);
		const evalue = [];
		eventFiles.forEach((file) => {
	    const event = require(`${file}`);
	    if (!event.execute) {
	      client.logger.error(`error`, `Execute function is required for events! (${file})`);
	    }
	    if (!event.name) {
	      client.logger.error(`error`, `Name is required for events! (${file})`);
	    }
			if (event.once) {
      	client.once(event.name, event.execute.bind(null, client));
				evalue.push(event.name)
	    } else {
	      client.on(event.name, event.execute.bind(null, client));
				evalue.push(event.name)
	    }
	    delete require.cache[require.resolve(`${file}`)];
  	});
			
		const commandFiles = await globPromise(`${process.cwd()}/slashcommands/**/*.js`);
		const cvalue = [];
		for await (const file of commandFiles) {
	    const command = require(`${file}`);
	    if (!command.name) {
	      client.logger.error(`error`, `Name is required for slashCommands! (${file})`);
	    }
			delete require.cache[require.resolve(file)];
			client.slashCommands.set(command.name, command);
			cvalue.push(command.name)
  	}

	  const commandFiles1 = await globPromise(`${process.cwd()}/commands/**/*.js`);
		const cvalue1 = [];
		commandFiles1.map((value) => {
			const file1 = require(value);
			const splitted1 = value.split("/");
			const directory1 = splitted1[splitted1.length - 2];
			delete require.cache[require.resolve(value)];
			if (file1.name) {
			  const properties = { directory1, ...file1 };
			  client.commands.set(file1.name, properties);
				cvalue1.push(file1.name)
			}
		});

			
		const slashCommands = await globPromise(`${process.cwd()}/slashcommands/**/*.js`);
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
			
		let Embed = new client.discord.MessageEmbed()
      .setTitle(`Reload`)
			.setDescription(`Successfully Reload All`)
			.addFields({ name: `All Slash Commands`, value: "```" + cvalue + "```"})
			.addFields({ name: `All Prefix Commands`, value: "```" + cvalue1 + "```"})
			.addFields({ name: `All Bot Events`, value: "```" + evalue + "```"})
			// .addFields({ name: `All Bot Events`, value: "```暫無資料```"})
      .setColor(client.random_color())
      .setFooter({
        text: client.config.embedfooterText,
        iconURL: client.user.avatarURL(),
      });
    await message.reply({ embeds:[Embed]});
	}
}
