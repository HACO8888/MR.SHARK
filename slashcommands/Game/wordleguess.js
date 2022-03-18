const Wordle = require(`${process.cwd()}/slashwordle.js`);
module.exports = {
  name: "wordleguess",
  usage: "/wordleguess <要輸入的答案>",
	options: [
    {
      name: "答案",
      description: "要輸入的答案",
      type: 3,
      required: true,
    },
  ],
  category: "遊戲",
  description: "猜Wordle字!",
  run: async (client, interaction) => {
		const answer = interaction.options.getString("答案");
		Wordle.SlashPlayWordle(client, interaction, answer);
  },
};
