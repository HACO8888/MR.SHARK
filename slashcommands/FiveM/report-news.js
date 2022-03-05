const wait = require("util").promisify(setTimeout);
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "report-news",
  description: "在達爾小鎮回報新聞",
  category: "FiveM",
  options: [
    {
      name: "標題",
      type: 3,
      description: "要回報的標題",
      required: true,
    },
    {
      name: "內容",
      type: 3,
      description: "要回報的內容",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    try {
      const title = interaction.options.getString("標題");
      const content = interaction.options.getString("內容");
      if (interaction.guildId === "747765361302044732" || interaction.guildId === "806477754681262100") {
        if (interaction.channelId === "937584529135255583" || interaction.channelId === "931494593596358696") {
					const channel = interaction.guild.channels.cache.get("940671190509420585");
          const report = new MessageEmbed()
            .setColor(client.random_color())
            .setTitle(title)
            .setDescription(content)
            .setFooter({
              text: `${interaction.member.displayName}`,
              iconURL: `${interaction.user.displayAvatarURL({
                format: "png",
              })}`,
            });
          channel.send({ embeds: [report] });
          interaction.channel.send(
            `⭕ | <@${interaction.member.id}>成功回報了一則新聞`
          );
          await interaction.reply({
            content: "⭕ | 成功回報 | 標題:" + title + " | 內容:" + content,
            ephemeral: true,
          });
					return;
        } else {
          await interaction.reply({
            content: `❌ | 回報失敗 | 原因:此頻道不支援此功能`,
            ephemeral: false,
          });
					return;
        }
      } else {
        await interaction.reply({
          content: `❌ | 回報失敗 | 原因:此伺服器不支援此功能`,
          ephemeral: false,
        });
				return;
      }
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "❌ | 回報失敗 | 原因: " + error.message,
        ephemeral: true,
      });
			return;
    }
  },
};
