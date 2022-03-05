const wait = require("util").promisify(setTimeout);
const { readdirSync } = require("fs");

module.exports = {
  name: "help",
  usage: "/help [指令]",
  options: [
    {
      name: "指令",
      description: "要查看的指令",
      type: 3,
      required: false,
    },
  ],
  category: "一般",
  description: "幫助你聊解指令的指令!",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    const row = new client.discord.MessageActionRow().addComponents(
      new client.discord.MessageButton()
        .setLabel("邀請我到伺服器")
        .setStyle("LINK")
        .setURL(
          "https://discord.com/api/oauth2/authorize?client_id=940285138393239573&permissions=8&scope=bot%20applications.commands"
        ),
      new client.discord.MessageButton()
        .setLabel("官方支援群組")
        .setStyle("LINK")
        .setURL("https://discord.gg/RtsckgRjqJ")
      // new client.discord.MessageButton()
      //   .setLabel("GitHub")
      //   .setStyle("LINK")
      //   .setURL("https://github.com/MRHACO")
    );

    const commandInt = interaction.options.getString("指令");
    if (!commandInt) {
      const botCommandsList = [];
      readdirSync(`./slashcommands/Bot`).forEach((file) => {
        const filen = require(`../../slashcommands/Bot/${file}`);
        const name = `\`${filen.name}\``;
        botCommandsList.push(name);
      });

      const FiveMCommandsList = [];
      readdirSync(`./slashcommands/FiveM`).forEach((file) => {
        const filen = require(`../../slashcommands/FiveM/${file}`);
        const name = `\`${filen.name}\``;
        FiveMCommandsList.push(name);
      });

      const helpEmbed = new client.discord.MessageEmbed()
        .setTitle(`${client.user.username} 斜槓指令支援`)
        .setDescription(
          `嗨!**<@${interaction.member.id}>**,我是<@${client.user.id}>\n你可以使用 \`sh!help\` 來查看所有Prefix指令\n你也可以使用 \`/help\` 來查看所有斜槓指令\n**Prefix指令總數:** ${client.commands.size}\n**斜槓指令總數:** ${client.slashCommands.size}`
        )
        .addField(
          "🤖 - Bot",
          botCommandsList.map((data) => `${data}`).join(", "),
          true
        )
        .addField(
          "🌐 - FiveM",
          FiveMCommandsList.map((data) => `${data}`).join(", "),
          true
        )
        .setColor(client.config.embedColor)
        .setFooter({
          text: client.config.embedfooterText,
          icon_url: client.user.avatarURL(),
        });

      interaction.followUp({ embeds: [helpEmbed], components: [row] });
    } else {
      const command = client.slashCommands.get(commandInt.toLowerCase());

      if (!command) {
        interaction.followUp({
          content: `找不到指令"${commandInt}"`,
        });
      } else {
        let command = client.slashCommands.get(commandInt.toLowerCase());
        let name = command.name;
        let description = command.description || "無";
        let usage = command.usage || "無";
        let category = command.category || "無";

        let helpCmdEmbed = new client.discord.MessageEmbed()
					.setAuthor({ name: `${client.user.username} 斜槓指令支援`, iconURL: client.user.avatarURL() })
          .setTitle(
            `🔍 | \`${name.toLocaleString()}\` 指令`
          )
					.setDescription(`${description}`)
          .addFields(
						{ name: "指令類別", value: `${category}` },
						{ name: "指令別名", value: `別傻了斜槓指令並沒有別名` },
            { name: "使用方法", value: " `<>` 是必填項目 `[]` 是選填項目 \n ```" + usage + "```" }
          )
          .setColor(client.config.embedColor)
          .setFooter({
            text: client.config.embedfooterText,
            icon_url: client.user.avatarURL(),
          });

        interaction.followUp({ embeds: [helpCmdEmbed] });
      }
    }
  },
};
