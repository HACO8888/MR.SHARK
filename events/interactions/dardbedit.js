const USERS = require(`${process.cwd()}/models/darjob`)
module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
		if (!interaction.isButton()) return;
    if (interaction.guildId === `747765361302044732`) {
			interaction.guild.members.cache.forEach(async (member) =>{
				if(interaction.customId === `dar-delete-job-db-y-${member.id}`){
					var userDB = await USERS.findOne({ userID: member.id });
					if (!userDB) {
						const NewuserDB = new USERS({
							userID: member.id,
							jobyet: "NOPE",
							whichjob: "NOPE"
						})
						await NewuserDB.save();
						userDB = await USERS.findOne({ userID: member.id });
					}
					userDB.jobyet = 'NOPE'
					userDB.save()
					interaction.reply('⭕ | 成功審核，你選擇了通過\n請注意此系統並不會通知玩家通過或不通過\n請務必一定要自行通知玩家是否通過\n```玩家名稱:' + member.user.tag + '(' + member.displayName + ')\n玩家ID:' + member.id + '```')
				} else if(interaction.customId === `dar-delete-job-db-n-${member.id}`){
					var userDB = await USERS.findOne({ userID: member.id });
					if (!userDB) {
						const NewuserDB = new USERS({
							userID: member.id,
							jobyet: "NOPE",
							whichjob: "NOPE"
						})
						await NewuserDB.save();
						userDB = await USERS.findOne({ userID: member.id });
					}
					userDB.jobyet = 'NOPE'
					userDB.save()
					interaction.reply('⭕ | 成功審核，你選擇了不通過\n請注意此系統並不會通知玩家通過或不通過\n請務必一定要自行通知玩家是否通過\n```玩家名稱:' + member.user.tag + '(' + member.displayName + ')\n玩家ID:' + member.id + '```')
				} 
			})
		}
	}
}