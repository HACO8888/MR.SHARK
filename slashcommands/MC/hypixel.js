const request = require('request');
module.exports = {
  name: "hypixel",
  usage: "/hypixel",
  category: "一般",
  description: "查看Hypixel資訊",
  options: [{name: "id",description: "請輸入一個Minecraft ID",type: 3,required: true,}],
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
		const args = interaction.options.getString("id")
		request(`https://api.mojang.com/users/profiles/minecraft/${args}`, { json: true }, (err, res, profile) => {
			const uuid = profile.id
			request(`https://api.hypixel.net/player?key=${process.env['HYPIXEL_API_KEY']}&uuid=${uuid}`, { json: true }, (err, res, player) => {
				request(`https://api.hypixel.net/guild?key=${process.env['HYPIXEL_API_KEY']}&player=${uuid}`, { json: true }, (err, res, pguild) => {
					request(`https://api.hypixel.net/status?key=${process.env['HYPIXEL_API_KEY']}&uuid=${uuid}`, { json: true }, (err, res, status) => {
						const base = 10000;
						const growth = 2500;
						const reversePqPrefix = -(base - 0.5 * growth) / growth;
						const reverseConst = reversePqPrefix ** 2;
						const lvl = (1 + reversePqPrefix + Math.sqrt(reverseConst + (2 / growth) * player.player.networkExp)).toFixed(2) || "0"
						const karma = player.player.karma || "0"
						var playerguild = ``
						if (pguild.guild != null) { 
                            var playerguild = `${pguild.guild.name}`
						}
						//console.log(pguild)
						const fisrtlogin = `<t:${Math.floor(player.player.firstLogin / 1000)}>` || "不可考"
						var lastLogin = ``
						if (status.session) {
							var lastLogin = `<t:${Math.floor(player.player.lastLogin / 1000)}:R>`
						} else {
							var lastLogin = `在線`
						}
		
						const embed = new client.discord.MessageEmbed()
							.setTitle(`${profile.name}`)
							.setDescription(`**UUID** - \`${uuid}\``)
							.setThumbnail(`https://crafatar.com/avatars/${uuid}`)
							.setTimestamp()
							.setColor(client.random_color())
						    .setFooter({
						        text: client.config.embedfooterText,
						        iconURL: client.user.avatarURL(),
						    })
							.addField(`Karma`, `\`${karma}\``, true)
							.addField(`等級`, `\`${lvl}\``, true)
							if (playerguild) {
								embed.addField(`公會`, `\`${playerguild}\``, true)
							}
							embed.addField(`首次登錄 ∙ 最後登錄`, `${fisrtlogin} - ${lastLogin}`, true)
						    
						    interaction.followUp({ embeds: [embed] })
					})
				})
			});
		})
  },
};
