const os = require("os");
const ms = require("ms")

var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();
var getpercentage = ((usedMemory/totalMemory) * 100).toFixed(2) + '%';

module.exports = {
	name: 'botinfo',
	aliases: ['b','bi','binfo'],
	category: '一般',
	description: "查看機器人的一些資訊",
	usage: `${process.env['prefix']}botinfo`,
	run: async (client, message) => {
		const core = os.cpus()[0];
		let Embed = new client.discord.MessageEmbed()
			.setTitle(`機器人資訊`)
			.setThumbnail(client.user.displayAvatarURL())
			.addField(`機器人名稱`,`${client.user.username}`)
			.addField(`機器人ID`,`${client.user.id}`)
			.addField(`Node.js 版本`,`${process.version}`)
			.addField(`Discord.js 版本`,`v${require("discord.js").version}`)
			.addField('硬體設備',`作業系統 \`${process.platform}\`\n主機開機時間 \`${ms(os.uptime() * 1000, { long: true })}\`\nCPU 核心 \`${os.cpus().length}\`\nCPU規格 \`${core.model}\`\nCPU 速度 \`${core.speed}MHz\`\n記憶體使用量百分比 \`${getpercentage}\`\n記憶體使用量 \`${(usedMemory/ Math.pow(1024, 3)).toFixed(2)} GB\``)
			.setTimestamp()
			.setColor(client.random_color())
			.setFooter({
				text: client.config.embedfooterText,
				iconURL: client.user.avatarURL(),
			});
		await message.reply({
			embeds: [Embed],
			allowedMentions: { repliedUser: false },
		});
	},
};