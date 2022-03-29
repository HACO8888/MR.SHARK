const wait = require("util").promisify(setTimeout);

module.exports = {
  name: "removerole",
  description: "為群組成員移除身分組",
  category: "管理",
  options: [
    {
      name: "人",
      type: 6,
      description: "要拿掉的人",
      required: true,
    },
    {
      name: "身分組",
      type: 8,
      description: "要拿掉的身分組",
      required: true,
    },
  ],
  run: async (client, interaction) => {
		// if(interaction.member.id !== '508964901415550976' && interaction.member.id !== '536445172247167016' && interaction.member.id !== '509707726256078859' && interaction.member.id !== '244403316291796992') {
		// 	return interaction.reply("⚠️這個指令正在進行例行性更新...")
		// }
		try {
      const role = interaction.options.getRole("身分組");
      const user = interaction.options.getMember("人");
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
			} else if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
				await interaction.reply({
					content: `❌ | 新增身分組失敗 | 機器人的權限不足`,
				});
				return;
			}
      //   console.log(user)
      if (interaction.guildId) {
        if (interaction.channelId) {
          if (interaction.member) {//.roles.cache.has("784667920642080799")
            //   console.log(role.id)
            if (interaction.member.roles.cache.has(role.id)) {
              user.roles.remove(role.id);
              await interaction.reply({
                content: `⭕ | 成功把${user}的身分組${role}移除`,
              });
							if (interaction.guildId === "747765361302044732") {
								const user1 = client.users.cache.get(user.id)
								user.setNickname(`🙋【達爾小鎮-鎮民】${user1.username}`)		
								return;
							} else {
								return;
							}
            } else {
              await interaction.reply({
                content: `❌ | 移除身分組失敗 | 您沒有${role}所以不能使用`,
              });
							return;
            }
          } else {
            await interaction.reply({
              content: `❌ | 移除身分組失敗 | 您的權限不足`,
            });
						return;
          }
        } else {
          await interaction.reply({
            content: `❌ | 移除身分組失敗 | 請至<#936888747172184065>使用指令`,
          });
					return;
        }
      } else {
        await interaction.reply({
          content: `❌ | 移除身分組失敗 | 原因:此伺服器不支援此功能`,
        });
				return;
      }
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "❌ | 移除身分組失敗 | 原因: " + error.message,
      });
			return;
    }
  },
};
