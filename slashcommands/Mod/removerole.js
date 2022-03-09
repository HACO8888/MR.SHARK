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
    try {
      const role = interaction.options.getRole("身分組");
      const user = interaction.options.getMember("人");
      //   console.log(user)
      if (interaction.guildId) {
        if (interaction.channelId) {
          if (interaction.member) {//.roles.cache.has("784667920642080799")
						if (interaction.guildId === "747765361302044732") {
							if (!interaction.member.roles.cache.has("784667920642080799")) {
								await interaction.reply({
              		content: `❌ | 新增身分組失敗 | 您的權限不足`,
            		});
								return;
							}
						}			
            //   console.log(role.id)
            if (interaction.member.roles.cache.has(role.id)) {
              user.roles.remove(role.id);
              await interaction.reply({
                content: `⭕ | 成功把${user}的身分組${role}移除`,
              });
							return;
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
