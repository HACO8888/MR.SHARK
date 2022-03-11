const Discord = require("discord.js");
const { Client, Collection, Intents } = require("discord.js");
const Logger = require("./modules/Logger");
const Embeds = require("./modules/Embeds");
const Util = require("./modules/Util");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
	allowedMentions: { parse: ["roles", "users"], repliedUser: false }
});

module.exports = client;

client.logger = Logger;
client.utils = Util;
client.say = Embeds;

client.discord = Discord;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

client.log = function log(args, color) {
	if (!color) {
		console.log("\x1b[32m[MR.SHARK]:\x1B[0m" + args + "\x1B[0m");
	}	else {
		console.log("\x1b[32m[MR.SHARK]:" + color + args + "\x1B[0m");
	}
};

client.random_color = function random_color() {
	const randomBetween = (min, max) =>
		Math.floor(Math.random() * (max - min + 1) + min);
	const color = [
		randomBetween(0, 255),
		randomBetween(0, 255),
		randomBetween(0, 255),
	];
	return(color);
};
process.on("uncaughtException", console.log)
process.on("unhandledRejection", console.log)
					 
require("./handler/NormalHandler")(client);
require("./handler/EventHandler")(client);
require("./handler/CommandHandler")(client);

client.login(process.env['TOKEN']);