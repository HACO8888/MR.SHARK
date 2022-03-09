const wait = require("util").promisify(setTimeout);
const { MessageEmbed } = require("discord.js");
const fs = require('fs');

module.exports = {
  name: "rxsetup",
  description: "在溏心鎮申請鎮民身分組",
  category: "FiveM",
  options: [
    {
      name: "discord名稱",
      type: 3,
      description: "輸入自己的Discord名稱",
      required: false,
    },
    {
      name: "steam名稱",
      type: 3,
      description: "輸入自己的Steam名稱",
      required: false,
    },
		{
      name: "steam網址",
      type: 3,
      description: "輸入自己的Steam網址",
      required: false,
    },
		{
      name: "年齡",
      type: 3,
      description: "輸入自己年齡",
      required: false,
    },
		{
      name: "機器人很棒對吧",
      type: 3,
      description: "輸入對機器人的使用感想或是看法",
      required: false,
    },
  ],
  run: async (client, interaction) => {
    try {
      const discord = interaction.options.getString("discord名稱");
      const steam = interaction.options.getString("steam名稱");
			const steamurl = interaction.options.getString("steam網址");
			const age = interaction.options.getString("年齡");
			const botgood = interaction.options.getString("機器人很棒對吧");
			
			//溏心鎮Guild ID:929211779718983690	Shark Test Area Guild ID:806477754681262100
			//溏心鎮Channel ID:931502169717342269	Shark Test Area Channel ID:931494593596358696
      if (interaction.guildId === "806477754681262100" || interaction.guildId === "929211779718983690") {
        if (interaction.channelId === "931494593596358696" || interaction.channelId === "931502169717342269") {
					if (!discord){
						await interaction.reply({ content: `❌ | 申請失敗 | 失敗類別:填寫問題 | 原因:您沒有輸入Discord名稱`, ephemeral: false });
						return;
					} else if (!steam){
						await interaction.reply({ content: `❌ | 申請失敗 | 失敗類別:填寫問題 | 原因:您沒有輸入Steam名稱`, ephemeral: false });
						return;
					} else if (!steamurl){
						await interaction.reply({ content: `❌ | 申請失敗 | 失敗類別:填寫問題 | 原因:您沒有輸入Steam網址`, ephemeral: false });
						return;
					} else if (!age){
						await interaction.reply({ content: `❌ | 申請失敗 | 失敗類別:填寫問題 | 原因:您沒有輸入年齡`, ephemeral: false });
						return;
					}
					
					const data = new MessageEmbed()
						.setColor(client.random_color())
						.setTitle(`${interaction.member.user.tag} 的申請資料`)
						.setFooter({text: client.config.embedfooterText, icon_url: client.user.avatarURL(),});
					if (!botgood){
						data.addFields([{name: "Discord名稱", value: discord}, {name: "Steam名稱", value: steam}, {name: "Steam網址", value: steamurl}, {name: "年齡", value: age}])						
					} else {
						data.addFields([{name: "Discord名稱", value: discord}, {name: "Steam名稱", value: steam}, {name: "Steam網址", value: steamurl}, {name: "年齡", value: age}, {name: "使用者對機器人的使用感想或是看法", value: botgood}])
					}
					
					const row = new client.discord.MessageActionRow().addComponents(
						new client.discord.MessageButton()
							.setCustomId(`rxsetup-yes?id=${interaction.member.id}`)
							.setLabel("通過")
							.setStyle("SUCCESS"),
						new client.discord.MessageButton()
							.setCustomId(`rxsetup-no?id=${interaction.member.id}`)
							.setLabel("未通過")
							.setStyle("DANGER"),
      			new client.discord.MessageButton()
	        		.setLabel("邀請我")
	        		.setStyle("LINK")
	        		.setURL("https://discord.com/api/oauth2/authorize?client_id=940285138393239573&permissions=8&scope=bot%20applications.commands"),
      			new client.discord.MessageButton()
	        		.setLabel("支援群")
	        		.setStyle("LINK")
	        		.setURL("https://discord.gg/RtsckgRjqJ")
    			);
					
					if (interaction.guildId === "929211779718983690"){
						const channel = interaction.guild.channels.cache.get("947177884081061989");
						channel.send({ embeds: [data], components: [row] });
					} else if (interaction.guildId === "806477754681262100") {
						const channel = interaction.guild.channels.cache.get("947176690302460014");
						channel.send({ embeds: [data], components: [row] });
					}

						
					await interaction.reply({
            content: `⭕ | 申請成功 | 請靜待審核，不要煩管理員喔!`,
            ephemeral: false,
          });
					
					return;
        } else {
          await interaction.reply({
            content: `❌ | 申請失敗 | 失敗類別:權限問題 | 原因:此頻道不支援此功能`,
            ephemeral: false,
          });
					return;
        }
      } else {
        await interaction.reply({
          content: `❌ | 申請失敗 | 失敗類別:權限問題 | 原因:此伺服器不支援此功能`,
          ephemeral: false,
        });
				return;
      }
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "❌ | 申請失敗 | 失敗類別:機器人出事 | 原因: " + error.message,
        ephemeral: false,
      });
			return;
    }
  },
};
