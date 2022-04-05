const wait = require("util").promisify(setTimeout);
const { Permissions } = require('discord.js');


module.exports = {
  name: "addrole",
  description: "為群組成員新增身分組",
  category: "管理",
  options: [
    {
      name: "人",
      type: 6,
      description: "要新增的人",
      required: true,
    },
    {
      name: "身分組",
      type: 8,
      description: "要新增的身分組",
      required: true,
    },
  ],
  run: async (client, interaction) => {

    try {
			// if(interaction.member.id !== '508964901415550976' && interaction.member.id !== '536445172247167016' && interaction.member.id !== '509707726256078859' && interaction.member.id !== '244403316291796992') {
			// 	return interaction.reply("⚠️這個指令正在進行例行性更新...")
			// }
      const role = interaction.options.getRole("身分組");
      const user = interaction.options.getMember("人");
			const member = interaction.guild.members.cache.get("949772996216750171")
			if (interaction.guildId === "747765361302044732") {
				if (!interaction.member.roles.cache.has("784667920642080799")) {
					await interaction.reply({
						content: `❌ | 新增身分組失敗 | 您的權限不足`,
					});
					return;
				}
			} else if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
				await interaction.reply({
					content: `❌ | 新增身分組失敗 | 您的權限不足，你沒有\`管理身分組\`的身分組`,
				});
				return;
			} else if (!member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
				await interaction.reply({
					content: `❌ | 新增身分組失敗 | 機器人的權限不足，機器人沒有\`管理身分組\`的身分組`,
				});
				return;
			}
			
      if (interaction.guildId) {
        if (interaction.channelId) {
          if (interaction.member) {//.roles.cache.has("784667920642080799")
            if (interaction.member.roles.cache.has(role.id)) {
              user.roles.add(role);
              await interaction.reply({
                content: `⭕ | 成功為${user}新增${role}`,
              });
							if (interaction.guildId === "747765361302044732") {
								const user1 = client.users.cache.get(user.id)
								if (role.id === '784501669907398727') {
									user.setNickname(`🚔【達爾警局-實習警員】${user1.username}`)		
								} else if (role.id === '784501846991044609') {
									user.setNickname(`🚨【醫護局－實習醫生】${user1.username}`)
								} else if (role.id === '784502091854774372') {
									user.setNickname(`🔩 修車廠實習技工 - ${user1.username}`)
								} else if (role.id === '871278324280877146') {
									user.setNickname(`🍹【海濱餐酒館-實習員工】${user1.username}`)
								} else if (role.id === '946988504926281829') {
									user.setNickname(`🚙【鷹中國際-實習業務】${user1.username}`)
								} else if (role.id === '784503107962667008') {
									user.setNickname(`🚕【UBER-新進司機】${user1.username}`)
								}
								return;
							} else {
								return;
							}
            } else {
              await interaction.reply({
                content: `❌ | 新增身分組失敗 | 您沒有${role}所以不能使用`,
              });
							return;
            }
          } else {
            await interaction.reply({
              content: `❌ | 新增身分組失敗 | 您的權限不足`,
            });
						return;
          }
        } else {
          await interaction.reply({
            content: `❌ | 新增身分組失敗 | 請至<#936888747172184065>使用指令`,
          });
					return;
        }
      } else {
        await interaction.reply({
          content: `❌ | 新增身分組失敗 | 原因:此伺服器不支援此功能`,
        });
				return;
      }
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "❌ | 新增身分組失敗 | 原因: " + error.message,
      });
			return;
    }
  },
};
