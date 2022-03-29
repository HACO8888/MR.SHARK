const presence = {
    online: '<:Online:746672406411870331>上線',
    idle: '<:Idle:746672449353154650>閒置',
    dnd: '<:Dnd:746672747287019610>請勿打擾',
    offline: '<:Offline:746672917584281630>離線/隱形',
};

const permissions = {
	"CREATE_INSTANT_INVITE": "`建立邀請`",
	"KICK_MEMBERS": "`踢出成員`",
	"BAN_MEMBERS": "`對成員停權`",
	"ADMINISTRATOR": "`管理者`",
	"MANAGE_CHANNELS": "`管理頻道`",
	"MANAGE_GUILD": "`管理伺服器`",
	"ADD_REACTIONS": "`新增反應`",
	"VIEW_AUDIT_LOG": "`檢視審核紀錄`",
	"PRIORITY_SPEAKER": "`優先發言者`",
	"STREAM": "`視訊通話`",
	"VIEW_CHANNEL": "`檢視頻道`",
	"SEND_MESSAGES": "`發送訊息`",
	"SEND_TTS_MESSAGES": "`傳送文字朗讀訊息`",
	"MANAGE_MESSAGES": "`管理訊息`",
	"EMBED_LINKS": "`崁入連結`",
	"ATTACH_FILES": "`附加檔案`",
	"READ_MESSAGE_HISTORY": "`讀取訊息歷史`",
	"MENTION_EVERYONE": "`提及 @everyone，@here 和所有身分組`",
	"USE_EXTERNAL_EMOJIS": "`使用外部表情符號`",
	"VIEW_GUILD_INSIGHTS": "`檢視 Server Insights`",
	"CONNECT": "`連接連接`",
	"SPEAK": "`說話`",
	"MUTE_MEMBERS": "`禁音成員`",
	"DEAFEN_MEMBERS": "`讓成員拒聽`",
	"MOVE_MEMBERS": "`移動成員`",
	"USE_VAD": "`使用語音活動`",
	"CHANGE_NICKNAME": "`更改暱稱`",
	"MANAGE_NICKNAMES": "`管理暱稱`",
	"MANAGE_ROLES": "`管理身分組`",
	"MANAGE_WEBHOOKS": "`管理 Webhooks`",
	"MANAGE_EMOJIS_AND_STICKERS": "`管理情符號與貼圖`",
	"USE_APPLICATION_COMMANDS": "`使用應用程式命令`",
	"REQUEST_TO_SPEAK": "`請求發言`",
	"MANAGE_EVENTS": "`管理活動`",
	"MANAGE_THREADS": "`管理論壇串`",
	"USE_PUBLIC_THREADS": "`使用公開討論串`",
	"CREATE_PUBLIC_THREADS": "`建立公開討論串`",
	"USE_PRIVATE_THREADS": "`使用私人討論串`",
	"CREATE_PRIVATE_THREADS": "`建立私人討論串`",
	"USE_EXTERNAL_STICKERS": "`使用外部貼圖`",
	"SEND_MESSAGES_IN_THREADS": "`在訊息串中傳送訊息`",
};

module.exports = {
  name: "userinfo",
  usage: "/userinfo [要查詢的使用者]",
  category: "資訊",
  description: "查看使用者的一些資訊!",
  run: async (client, interaction) => {
		const user = interaction.options.getUser('用戶') || interaction.user;
		const member = interaction.guild.members.cache.get(user.id) || interaction.member;
		//const member = interaction.member;
		//const user = interaction.user;
		
		
		let time = user.createdAt.toUTCString().split(" ");
		let hor = user.createdAt.getUTCHours(8);
		let H = (hor+8) + time[4].substring(2);
		let ctime = time[3] + " " + H + " " + time[2] + " " + time[1] +", " +time[0] + " UTC+8";
		const memberroles = member.roles.cache.filter((roles) => roles.id !== interaction.guild.id).map((role) => role.toString());
		if (!memberroles[0]) {
			memberroles.push("@everyone")
		}
		let permission = member.permissions.toArray()
		let p = [];
		if (permission.includes('ADMINISTRATOR')) {
			p.push(permissions["ADMINISTRATOR"])
		} else {
			permission.forEach(function(item) {
  			p.push(permissions[item])
			});
		}
		const status = presence[member.presence?.status] || presence["offline"]
           
		let Embed = new client.discord.MessageEmbed()
		.setTitle(`用戶資訊`)
		.setThumbnail(user.displayAvatarURL())
		.addField(`用戶名稱`, `${user.tag}`, true)
		.addField(`用戶ID`, `${user.id}`, true)
		//.addField(`用戶狀態`,`${presence[member.presence?.status]}`, true)
		.addField(`用戶狀態`,`${status}`, true)
		.addField(`身分組`, memberroles.join(" "), true)    
		.addField(`權限`, p.join(" "), true)       
		.addField(`用戶創建帳號時間`,`<t:${user.createdAt}>`, true)
		.setTimestamp()
		.setColor(client.random_color())
		.setFooter({
			text: client.config.embedfooterText,
			iconURL: client.user.avatarURL(),
		});
		interaction.reply({ embeds: [Embed]});
  },
};
