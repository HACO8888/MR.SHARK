const { readdirSync } = require("fs");

module.exports = {
  name: "help",
  aliases: ["cmd", "cmds", "command", "commands"],
  usage: "sh!help [要查詢的指令]",
  category: "一般",
  description: "幫助你聊解指令的指令!",
  run: async (client, message, args) => {
    const row = new client.discord.MessageActionRow().addComponents(
      new client.discord.MessageButton()
        .setLabel("邀請我到伺服器")
        .setStyle("LINK")
        .setURL(
          "https://discord.com/api/oauth2/authorize?client_id=949772996216750171&permissions=8&scope=bot%20applications.commands"
        ),
      new client.discord.MessageButton()
        .setLabel("官方支援群組")
        .setStyle("LINK")
        .setURL("https://discord.gg/RtsckgRjqJ"),
			new client.discord.MessageButton()
				.setLabel("填寫回饋單")
				.setCustomId(`open-report-form`)
				.setStyle("SUCCESS")
      // new client.discord.MessageButton()
      //   .setLabel("GitHub")
      //   .setStyle("LINK")
      //   .setURL("https://github.com/MRHACO")
    );

    if (!args[0]) {
			
      const botCommandsList = [];
      readdirSync(`./commands/Bot`).forEach((file) => {
        const filen = require(`../../commands/Bot/${file}`);
        const name = `\`${filen.name}\``;
        botCommandsList.push(name);
      });

			const InfoCommandsList = [];
      readdirSync(`./commands/Info`).forEach((file) => {
        const filen = require(`../../commands/Info/${file}`);
        const name = `\`${filen.name}\``;
        InfoCommandsList.push(name);
      });

			const GameCommandsList = [];
      readdirSync(`./commands/Game`).forEach((file) => {
        const filen = require(`../../commands/Game/${file}`);
        const name = `\`${filen.name}\``;
        GameCommandsList.push(name);
      });
			
			const DevCommandsList = [];
      readdirSync(`./commands/Dev`).forEach((file) => {
        const filen = require(`../../commands/Dev/${file}`);
        const name = `\`${filen.name}\``;
        DevCommandsList.push(name);
      });
			
      const helpEmbed = new client.discord.MessageEmbed()
        .setTitle(`${client.user.username} Prefix指令支援`)
        .setDescription(
          `嗨!**<@${message.author.id}>**,我是<@${client.user.id}>\n你可以使用 \`sh!help\` 來查看所有Prefix指令\n你也可以使用 \`/help\` 來查看所有斜槓指令\n**Prefix指令總數:** ${client.commands.size}\n**斜槓指令總數:** ${client.slashCommands.size}`
        )
        .addField(
          "🤖一般",
          botCommandsList.map((data) => `${data}`).join(", "),
          false
        )
				.addField(
          "📄資訊",
          InfoCommandsList.map((data) => `${data}`).join(", "),
          false
        )
				.addField(
          "👾遊戲",
          GameCommandsList.map((data) => `${data}`).join(", "),
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

      message.reply({
        embeds: [helpEmbed],
        allowedMentions: { repliedUser: false },
        components: [row],
      });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        message.reply({
          content: `找不到指令 \`"${args[0]}"\``,
          allowedMentions: { repliedUser: false },
        });
      } else {
        let command =
          client.commands.get(args[0].toLowerCase()) ||
          client.commands.find(
            (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
          );
        let name = command.name;
        let description = command.description || "No descrpition provided";
        let usage = command.usage || "No usage provided";
        let aliases = command.aliases || "這個指令沒有別名";
        let category = command.category || "No category provided!";

        let helpCmdEmbed = new client.discord.MessageEmbed()
				.setAuthor({ name: `${client.user.username} Prefix指令支援`, iconURL: client.user.avatarURL() })
          .setTitle(
            `🔍 | \`${name.toLocaleString()}\` 指令`
          )
					.setDescription(`${description}`)
          .addFields(
						{ name: "指令類別", value: `${category}` },
						{ name: "指令別名", value: `${aliases}` },
            { name: "使用方法", value: " `<>` 是必填項目 `[]` 是選填項目 \n ```" + usage + "```" }
          )
          .setColor(client.random_color())
          .setFooter({
            text: client.config.embedfooterText,
            iconURL: client.user.avatarURL(),
          });

        message.reply({
          embeds: [helpCmdEmbed],
          allowedMentions: { repliedUser: false },
        });
      }
    }
  },
};
