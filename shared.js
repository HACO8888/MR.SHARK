const { ShardingManager } = require("discord.js");
const chalk = require("chalk");
const manager = new ShardingManager('./index.js', { token: process.env['TOKEN'] });
manager.on("shardCreate", (shard) => console.log(`${chalk.green("[MR.SHARK]:")}${chalk.blueBright("[INFO]")}Shard ${shard.id} Launched Success`));
manager.spawn();
