const glob = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = {
    name: 'reload',
    aliasses: ['restart', 'rl'],
    usage: `sh!reload`,
	  category: "開發",
    description: '重新讀取所有指令',
  	run: async (client, message) => {
    if(!message.author.id === `536445172247167016` || !message.author.id === `508964901415550976`) return message.channel.send('You are not a Dev');     
		client.commands.clear();		
	  const commandFiles1 = await globPromise(`${process.cwd()}/commands/**/*.js`);
		commandFiles1.map((value) => {
			const file = require(value);
			const splitted = value.split("/");
			const directory = splitted[splitted.length - 2];
			delete require.cache[require.resolve(value)];
			if (file.name) {
			  const properties = { directory, ...file };
			  client.commands.set(file.name, properties);
			}
		});
    await message.reply(`成功重新讀取所有指令`,{
     	allowedMentions: { repliedUser: false },
    });
	}
}
