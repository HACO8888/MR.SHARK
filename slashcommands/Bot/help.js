const { readdirSync } = require("fs");

module.exports = {
  name: "help",
  usage: "/help [要查詢的指令]",
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
    const row = new client.discord.MessageActionRow().addComponents(
      new client.discord.MessageButton()
        .setLabel("邀請我到伺服器")
        .setStyle("LINK")
				.setEmoji("<:bot:950346766237175849")	
        .setURL(
          "https://discord.com/api/oauth2/authorize?client_id=949772996216750171&permissions=8&scope=bot%20applications.commands"
        ),
      new client.discord.MessageButton()
        .setLabel("官方支援群組")
        .setStyle("LINK")
				.setEmoji("<:discord:857215040666337291>")		
        .setURL("https://discord.gg/RtsckgRjqJ"),
			new client.discord.MessageButton()
				.setLabel("填寫回饋單")
				.setEmoji("📑")		
				.setCustomId(`open-report-form`)
				.setStyle("SUCCESS")
    );

    const commandInt = interaction.options.getString("指令");
    if (!commandInt) {
      const normalCommandsList = [];
      readdirSync(`./slashcommands/Bot`).forEach((file) => {
        const filen = require(`../../slashcommands/Bot/${file}`);
        const name = `\`${filen.name}\``;
        normalCommandsList.push(name);
      });

      const InfoCommandsList = [];
      readdirSync(`./slashcommands/Info`).forEach((file) => {
        const filen = require(`../../slashcommands/Info/${file}`);
        const name = `\`${filen.name}\``;
        InfoCommandsList.push(name);
      });
			
			const MoneyCommandsList = [];
      readdirSync(`./slashcommands/Money`).forEach((file) => {
        const filen = require(`../../slashcommands/Money/${file}`);
        const name = `\`${filen.name}\``;
        MoneyCommandsList.push(name);
      });

			const GameCommandsList = [];
      readdirSync(`./slashcommands/Game`).forEach((file) => {
        const filen = require(`../../slashcommands/Game/${file}`);
        const name = `\`${filen.name}\``;
        GameCommandsList.push(name);
      });

      const ModCommandsList = [];
      readdirSync(`./slashcommands/Mod`).forEach((file) => {
        const filen = require(`../../slashcommands/Mod/${file}`);
        const name = `\`${filen.name}\``;
        ModCommandsList.push(name);
      });

      const MCCommandsList = [];
      readdirSync(`./slashcommands/MC`).forEach((file) => {
        const filen = require(`../../slashcommands/MC/${file}`);
        const name = `\`${filen.name}\``;
        MCCommandsList.push(name);
      });

      const FiveMCommandsList = [];
      readdirSync(`./slashcommands/FiveM`).forEach((file) => {
        const filen = require(`../../slashcommands/FiveM/${file}`);
        const name = `\`${filen.name}\``;
        FiveMCommandsList.push(name);
      });

			const DevCommandsList = [];
      readdirSync(`./slashcommands/Dev`).forEach((file) => {
        const filen = require(`../../slashcommands/Dev/${file}`);
        const name = `\`${filen.name}\``;
        DevCommandsList.push(name);
      });

      const helpEmbed = new client.discord.MessageEmbed()
        .setTitle(`${client.user.username} 斜槓指令支援`)
        .setDescription(
          `嗨!**<@${interaction.member.id}>**,我是<@${client.user.id}>\n你可以使用 \`sh!help\` 來查看所有Prefix指令\n你也可以使用 \`/help\` 來查看所有斜槓指令\n**Prefix指令總數:** ${client.commands.size}\n**斜槓指令總數:** ${client.slashCommands.size}`
        )
        .addField(
          "🤖一般",
          normalCommandsList.map((data) => `${data}`).join(", "),
          false
        )
        .addField(
          "📄資訊",
          InfoCommandsList.map((data) => `${data}`).join(", "),
          false
        )
        .addField(
          "🔧管理",
          ModCommandsList.map((data) => `${data}`).join(", "),
          false
        )

				.addField(
          "🪙金流",
          MoneyCommandsList.map((data) => `${data}`).join(", "),
          false
        )
				.addField(
          "👾遊戲",
          GameCommandsList.map((data) => `${data}`).join(", "),
          false
        )

        .addField(
          "<:mc:947478763665514496>Minecraft",
          MCCommandsList.map((data) => `${data}`).join(", "),
          false
        )

        .addField(
          "<:fivem:944632001200271380>FiveM",
          FiveMCommandsList.map((data) => `${data}`).join(", "),
          false
        )

				.addField(
          "🧩開發",
          DevCommandsList.map((data) => `${data}`).join(", "),
          false
        )
        .setColor(client.random_color())
        .setFooter({
          text: client.config.embedfooterText,
          iconURL: client.user.avatarURL(),
        });

      interaction.reply({ embeds: [helpEmbed], components: [row] });
			return;
    } else {
      const command = client.slashCommands.get(commandInt.toLowerCase());

      if (!command) {
        interaction.reply(`找不到指令\`${commandInt}\``);
				return;
      } else {
        let command = client.slashCommands.get(commandInt.toLowerCase());
        let name = command.name;
        let description = command.description || "無";
        let usage = command.usage || "無";
        let category = command.category || "無";

        let helpCmdEmbed = new client.discord.MessageEmbed()
          .setAuthor({
            name: `${client.user.username} 斜槓指令支援`,
            iconURL: client.user.avatarURL(),
          })
          .setTitle(`🔍 | \`${name.toLocaleString()}\` 指令`)
          .setDescription(`${description}`)
          .addFields(
            { name: "指令類別", value: `${category}` },
            { name: "指令別名", value: `別傻了斜槓指令並沒有別名` },
            {
              name: "使用方法",
              value: " `<>` 是必填項目 `[]` 是選填項目 \n ```" + usage + "```",
            }
          )
          .setColor(client.random_color())
          .setFooter({
            text: client.config.embedfooterText,
            iconURL: client.user.avatarURL(),
          });

        interaction.reply({ embeds: [helpCmdEmbed] });
				return;
      }
    }
  },
};
