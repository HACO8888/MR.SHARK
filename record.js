const { createReadStream } = require('node:fs');
const { join } = require('node:path');
const ffmpeg = require('ffmpeg');
const { joinVoiceChannel, getVoiceConnection, createAudioResource, StreamType } = require('@discordjs/voice');
module.exports = {
	name: 'record',
	usage: `sh!record`,
	category: "管理",
	description: '𡜉機器人加入頻道然後錄音!',
	run: async (client, message, args) => {
	if(!message.author.id === `536445172247167016` || !message.author.id === `508964901415550976`) return message.channel.send('You are not a Dev');
		const channel = message.member.voice.channel;
	  if(!channel) return message.channel.send('請先加入一個語音頻道!');
		// const connection = message.member.voice.channel.join();
		joinVoiceChannel({
			channelId: message.member.voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator
		})
		const connection = getVoiceConnection(message.guild.id);
		let resource = createAudioResource(join(__dirname, 'file.mp3'));
		resource = createAudioResource(join(__dirname, 'file.mp3'), { inlineVolume: true });
		resource.volume.setVolume(0.5);
		resource = createAudioResource(createReadStream(join(__dirname, 'file.ogg'), {
			inputType: StreamType.OggOpus,
		}));
		resource = createAudioResource(createReadStream(join(__dirname, 'file.webm'), {
			inputType: StreamType.WebmOpus,
			inlineVolume: true,
		}));
		// const receiver = connection.receiver.createStream(message.member, {mode: "pcm",end: "silence"});

	  // const connection = await channel.join();
	  // const receiver = connection.receiver.createStream(message.member, {
	  //   mode: "pcm",
	  //   end: "silence"
	  // });
	
	  // const writer = receiver.pipe(fs.createWriteStream(`${process.cwd()}/record/recording.pcm`));
	  // writer.on('finish', () => {
	  //   channel.leave();
	  //   message.channel.send('It went quiet, so I left...');
	  // });
		// try {
		//   var process = new ffmpeg(`${process.cwd()}/record`);
		//   process.then(function (audio) {
		//     audio.fnExtractSoundToMP3(`${process.cwd()}/record/file.mp3` , function (error, file) {
		//       if (!error) console.log('Audio File: ' + file);
		//     });
		//   }, function (err) {
		//     console.log('Error: ' + err);      
		//   });
		// } catch (e) {
		//   console.log(e);
		// }
	}
}