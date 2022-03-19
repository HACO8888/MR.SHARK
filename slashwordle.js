const { MessageAttachment } = require('discord.js');
const fs = require('fs');
var csv = require('jquery-csv');
const Canvas = require('canvas');

function GetAnswer() {
    var j = Math.floor(Math.random() * answers.length);
    return answers[j].toUpperCase();
}

const ValidGuess = (guess) => {
    if (guess === undefined) {
        return false;
    } else if (guess.length !== 5) {
        return false;
    } else {
        return true;
    }
};

const GetTodaysDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
};

const AddSpace = (data) => {
    if (data.length == 0) {
        return "";
    } else {
        return " ";
    }
};

const GetImage = (guessLetter, answerLetter, i) => {
    if (guessLetter === undefined) {
        return 0;
    } else if (guessLetter.charAt(i) == answerLetter.charAt(i)) {
        return 1;
    } else if (answerLetter.includes(guessLetter.charAt(i))) {
        return 2;
    } else {
        return 3;
    }
};

function writeToCSVFile(newData) {
    const filename = 'data.csv';
    let csvContent = "data:text/csv;charset=utf-8," + newData.map(e => e.join(",")).join("\n");
    fs.writeFile(filename, csvContent, err => {
        if (err) {
            console.log('Error writing to csv file', err);
        }
    });
}

async function LoadGame(interaction, guesses, answer) {
    const canvas = Canvas.createCanvas(330, 397);
    const context = canvas.getContext('2d');
    const background = await Canvas.loadImage('./images/BlankImage.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.font = '42px Clear Sans, Helvetica Neue, Arial, sans-serif';
    context.textAlign = 'center'
    context.fillStyle = '#d7dadc';
    const absentSquare = await Canvas.loadImage('./images/ColorAbsent.png');
    const emptySquare = await Canvas.loadImage('./images/EmptySquare.png');
    const greenSquare = await Canvas.loadImage('./images/GreenSquare.png');
    const yellowSquare = await Canvas.loadImage('./images/YellowSquare.png');
    let square = absentSquare;
    let squareSize = 62;
    let rowOffset = 0;
    let buffer = 0;
    for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 5; i++) {
            const imageNumber = GetImage(guesses[j], answer, i);
            if (imageNumber == 0) {
                square = emptySquare;
            } else if (imageNumber == 1) {
                square = greenSquare;
            } else if (imageNumber == 2) {
                square = yellowSquare;
            } else if (imageNumber == 3) {
                square = absentSquare;
            }
            context.drawImage(square, i * squareSize + buffer, rowOffset, squareSize, squareSize);
            if (guesses[j] != undefined) {
                context.fillText(guesses[j].charAt(i), (squareSize / 2) + buffer + squareSize * i, rowOffset + 42);
            }
            buffer += 5;
        }
        buffer = 0;
        rowOffset += squareSize + 5;
    }
    const attachment = new MessageAttachment(canvas.toBuffer(), 'wordle.png');
    interaction.reply({ files: [attachment] });
}

async function Guess(interaction, guesses, newGuess, answer, notify) {
    const canvas = Canvas.createCanvas(330, 397);
    const context = canvas.getContext('2d');
    const background = await Canvas.loadImage('./images/BlankImage.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.font = '42px Clear Sans, Helvetica Neue, Arial, sans-serif';
    context.textAlign = 'center'
    context.fillStyle = '#d7dadc';
    // console.log("Answer " + answer);
    // console.log("newGuess " + newGuess);
    const absentSquare = await Canvas.loadImage('./images/ColorAbsent.png');
    const emptySquare = await Canvas.loadImage('./images/EmptySquare.png');
    const greenSquare = await Canvas.loadImage('./images/GreenSquare.png');
    const yellowSquare = await Canvas.loadImage('./images/YellowSquare.png');
    let square = absentSquare;
    let squareSize = 62;
    let rowOffset = 0;
    let buffer = 0;
    if (guesses == "") {
        guesses[0] = newGuess;
    } else {
        guesses.push(newGuess);
    }
    for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 5; i++) {
            const imageNumber = GetImage(guesses[j], answer, i);
            if (imageNumber == 0) {
                square = emptySquare;
            } else if (imageNumber == 1) {
                square = greenSquare;
            } else if (imageNumber == 2) {
                square = yellowSquare;
            } else if (imageNumber == 3) {
                square = absentSquare;
            }
            context.drawImage(square, i * squareSize + buffer, rowOffset, squareSize, squareSize);
            if (guesses[j] != undefined) {
                context.fillText(guesses[j].charAt(i), (squareSize / 2) + buffer + squareSize * i, rowOffset + 45);
            }
            buffer += 5;
        }
        buffer = 0;
        rowOffset += squareSize + 5;
    }
    const attachment = new MessageAttachment(canvas.toBuffer(), 'wordle.png');
		await interaction.reply({ embeds: [notify], files: [attachment] });
}

function SlashLoadNewWordle(client, interaction) {
    fs.readFile('data.csv', 'UTF-8', (err, fileContent) => {
        if (err) { console.log(err) }
        csv.toArrays(fileContent, {}, (err, data) => {
            if (err) { console.log(err) }
            if (data.length == 0) {
							data[0] = [
									'data:text/csv;charset=utf-8',
									'data:text/csv;charset=utf-8',
									'data:text/csv;charset=utf-8',
									'data:text/csv;charset=utf-8',
									'data:text/csv;charset=utf-8',
									'data:text/csv;charset=utf-8',
									'data:text/csv;charset=utf-8',
									'data:text/csv;charset=utf-8',
									'data:text/csv;charset=utf-8',
									'data:text/csv;charset=utf-8',
									'data:text/csv;charset=utf-8',
									'data:text/csv;charset=utf-8',
									'data:text/csv;charset=utf-8',
									'data:text/csv;charset=utf-8',
									'data:text/csv;charset=utf-8',
									'user',
									'wordOfTheDay',
									'canGuess',
									'lastGuessDate',
									'guesses',
									'wins',
									'games',
									'hasCompletedToday',
									'done'
							];
            }
            for (let i = 1, len = data.length; i < len; i++) {
                if (data[i][0] == interaction.member.id) {
                    if (data[i][9] === 'false') {
											const notify = new client.discord.MessageEmbed()
											.setTitle("你已經有遊戲開始了，使用`/wordleguess <五字單字>`來猜單字")
											.setColor(client.random_color())
											interaction.reply({embeds: [notify]});
											return;
                    } else {
                        data[i][1] = GetAnswer();
                        data[i][3] = GetTodaysDate();
                        data[i][4] = "";
                        data[i][8] = false;
                        data[i][9] = false;
                        writeToCSVFile(data);
                        LoadGame(interaction, data[i][4], data[i][1]);
                        return;
                    }
                }
            }
						data.push([interaction.member.id, GetAnswer(), 'false', GetTodaysDate(), , 0, 0, 0, false, false]);
						writeToCSVFile(data);
						LoadGame(interaction, "", "");
        })
    })
}

function SlashPlayWordle(client, interaction, answer) {
    fs.readFile('data.csv', 'UTF-8', (err, fileContent) => {
        if (err) { console.log(err) }
        csv.toArrays(fileContent, {}, (err, data) => {
            if (err) { console.log(err) }
            if (data.length == 0) {
                data[0] = [
                    'data:text/csv;charset=utf-8',
                    'data:text/csv;charset=utf-8',
                    'data:text/csv;charset=utf-8',
                    'data:text/csv;charset=utf-8',
                    'data:text/csv;charset=utf-8',
                    'data:text/csv;charset=utf-8',
                    'data:text/csv;charset=utf-8',
                    'data:text/csv;charset=utf-8',
                    'data:text/csv;charset=utf-8',
                    'data:text/csv;charset=utf-8',
                    'data:text/csv;charset=utf-8',
                    'data:text/csv;charset=utf-8',
                    'data:text/csv;charset=utf-8',
                    'data:text/csv;charset=utf-8',
                    'data:text/csv;charset=utf-8',
                    'user',
                    'wordOfTheDay',
                    'canGuess',
                    'lastGuessDate',
                    'guesses',
                    'wins',
                    'games',
                    'hasCompletedToday',
                    'done'
                ];
            }
            for (let i = 1, len = data.length; i < len; i++) {
							if (data[i][0] == interaction.member.id) {
								if (data[i][9] == "true") {
									const notify = new client.discord.MessageEmbed()
									.setTitle("你還沒開始遊戲!使用指令`/playwordle`來開始遊戲")
									.setColor(client.random_color())
									interaction.reply({embeds: [notify]});
									return;
								}
								var done = false;
								var guess = answer;
								if (!ValidGuess(guess)) {
									const notify = new client.discord.MessageEmbed()
									.setTitle("單字必須是五個字，或是正確的單字")
									.setColor(client.random_color())
									interaction.reply({embeds: [notify]});
									return;
								}
								var guesses = data[i][4].split(" ");
								guess = guess.toUpperCase();
								guessa = guess.split('');
								var ok = true;
								guessa.forEach((e) => {
										if (!abc.includes(e)) {
												ok = false;
												return;
										}
								})
								if (ok === false) {
									const notify = new client.discord.MessageEmbed()
									.setTitle("單字內容必須是英文字母喔!")
									.setColor(client.random_color())
									interaction.reply({embeds: [notify]});
									return;
								}
								data[i][4] = data[i][4] + AddSpace(data[i][4]) + guess;
								writeToCSVFile(data);
								for (var c = 0; c < guess.length; c++) {
										if (guess.charCodeAt(c) != data[i][1].charCodeAt(c)) {
												if (guesses.length === 5) {
													data[i][9] = true;
													data[i][8] = true;
													data[i][7] = parseInt(data[i][7]) + 1;

													writeToCSVFile(data);
													const notify = new client.discord.MessageEmbed()
													.setTitle("遊戲結束，你輸了，使用`/wordlestats`來看戰績吧!")
													.setColor(client.random_color())
													Guess(interaction, guesses, guess, data[i][1], notify);
													// interaction.reply({embeds: [notify]});
													return;
												}
												return;
										} else {
											data[i][9] = true;
											data[i][8] = true;
											data[i][6] = parseInt(data[i][6]) + 1;
											data[i][7] = parseInt(data[i][7]) + 1;
											writeToCSVFile(data);
											done = true;
											const notify = new client.discord.MessageEmbed()
											.setTitle("恭喜你猜出`" + data[i][1] + "`，你只用了" + (guesses.length) + "次!使用`/wordlestats`來看戰績吧!")
											.setColor(client.random_color())
											// interaction.followUp({embeds: [notify]});
											Guess(interaction, guesses, guess, data[i][1], notify);
											return;
										}
								}

							}
            }
						if (done === true) {
							return;
						} else {
							const notify = new client.discord.MessageEmbed()
							.setTitle("你的遊戲還沒開始，使用指令`sh!playwordle`來開始遊戲你")
							.setColor(client.random_color())
							interaction.reply({embeds: [notify]});
							return;
						}
        })
    })
}
function SlashShowWordleStats(client, interaction) {
    fs.readFile('data.csv', 'UTF-8', (err, fileContent) => {
        if (err) { console.log(err) }
        csv.toArrays(fileContent, {}, (err, data) => {
            if (err) { console.log(err) }
            for (let i = 1, len = data.length; i < len; i++) {
                if (data[i][0] == interaction.member.id) {
                    var wins = data[i][6];
                    var games = data[i][7];
                    var result = Math.round((wins / games) * 100);
										const notify = new client.discord.MessageEmbed()
										.setTitle("MR.SHARK Wordle 玩家遊玩數據:")
										.addFields({name: "遊玩次數:", value: games},{name: "勝率:", value: result + "%"})
										.setColor(client.random_color())
										interaction.reply({embeds: [notify]});
                    return;
                }
            }
            data[data.length] = [interaction.member.id, '', 'false', '', '', '0', '0', '0']
						const notify = new client.discord.MessageEmbed()
						.setTitle("MR.SHARK Wordle 玩家遊玩數據:")
						.addFields({name: "遊玩次數:", value: "0"},{name: "勝率:", value: "0%"})
						.setColor(client.random_color())
						interaction.reply({embeds: [notify]});
            writeToCSVFile(data);
        })
    })
}

module.exports = { SlashLoadNewWordle, SlashPlayWordle, SlashShowWordleStats };

abc = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
answers = ['ABUSE',

    'ADULT',

    'AGENT',

    'ANGER',

    'APPLE',

    'AWARD',

    'BASIS',

    'BEACH',

    'BIRTH',

    'BLOCK',

    'BLOOD',

    'BOARD',

    'BRAIN',

    'BREAD',

    'BREAK',

    'BROWN',

    'BUYER',

    'CAUSE',

    'CHAIN',

    'CHAIR',

    'CHEST',

    'CHIEF',

    'CHILD',

    'CHINA',

    'CLAIM',

    'CLASS',

    'CLOCK',

    'COACH',

    'COAST',

    'COURT',

    'COVER',

    'CREAM',

    'CRIME',

    'CROSS',

    'CROWD',

    'CROWN',

    'CYCLE',

    'DANCE',

    'DEATH',

    'DEPTH',

    'DOUBT',

    'DRAFT',

    'DRAMA',

    'DREAM',

    'DRESS',

    'DRINK',

    'DRIVE',

    'EARTH',

    'ENEMY',

    'ENTRY',

    'ERROR',

    'EVENT',

    'FAITH',

    'FAULT',

    'FIELD',

    'FIGHT',

    'FINAL',

    'FLOOR',

    'FOCUS',

    'FORCE',

    'FRAME',

    'FRANK',

    'FRONT',

    'FRUIT',

    'GLASS',

    'GRANT',

    'GRASS',

    'GREEN',

    'GROUP',

    'GUIDE',

    'HEART',

    'HENRY',

    'HORSE',

    'HOTEL',

    'HOUSE',

    'IMAGE',

    'INDEX',

    'INPUT',

    'ISSUE',

    'JAPAN',

    'JONES',

    'JUDGE',

    'KNIFE',

    'LAURA',

    'LAYER',

    'LEVEL',

    'LEWIS',

    'LIGHT',

    'LIMIT',

    'LUNCH',

    'MAJOR',

    'MARCH',

    'MATCH',

    'METAL',

    'MODEL',

    'MONEY',

    'MONTH',

    'MOTOR',

    'MOUTH',

    'MUSIC',

    'NIGHT',

    'NOISE',

    'NORTH',

    'NOVEL',

    'NURSE',

    'OFFER',

    'ORDER',

    'OTHER',

    'OWNER',

    'PANEL',

    'PAPER',

    'PARTY',

    'PEACE',

    'PETER',

    'PHASE',

    'PHONE',

    'PIECE',

    'PILOT',

    'PITCH',

    'PLACE',

    'PLANE',

    'PLANT',

    'PLATE',

    'POINT',

    'POUND',

    'POWER',

    'PRESS',

    'PRICE',

    'PRIDE',

    'PRIZE',

    'PROOF',

    'QUEEN',

    'RADIO',

    'RANGE',

    'RATIO',

    'REPLY',

    'RIGHT',

    'RIVER',

    'ROUND',

    'ROUTE',

    'RUGBY',

    'SCALE',

    'SCENE',

    'SCOPE',

    'SCORE',

    'SENSE',

    'SHAPE',

    'SHARE',

    'SHEEP',

    'SHEET',

    'SHIFT',

    'SHIRT',

    'SHOCK',

    'SIGHT',

    'SIMON',

    'SKILL',

    'SLEEP',

    'SMILE',

    'SMITH',

    'SMOKE',

    'SOUND',

    'SOUTH',

    'SPACE',

    'SPEED',

    'SPITE',

    'SPORT',

    'SQUAD',

    'STAFF',

    'STAGE',

    'START',

    'STATE',

    'STEAM',

    'STEEL',

    'STOCK',

    'STONE',

    'STORE',

    'STUDY',

    'STUFF',

    'STYLE',

    'SUGAR',

    'TABLE',

    'TASTE',

    'TERRY',

    'THEME',

    'THING',

    'TITLE',

    'TOTAL',

    'TOUCH',

    'TOWER',

    'TRACK',

    'TRADE',

    'TRAIN',

    'TREND',

    'TRIAL',

    'TRUST',

    'TRUTH',

    'UNCLE',

    'UNION',

    'UNITY',

    'VALUE',

    'VIDEO',

    'VISIT',

    'VOICE',

    'WASTE',

    'WATCH',

    'WATER',

    'WHILE',

    'WHITE',

    'WHOLE',

    'WOMAN',

    'WORLD',

    'YOUTH',

    'ALCON',

    'AUGHT',

    'HELLA',

    'ONE’S',

    'OUGHT',

    'THAME',

    'THERE',

    'THINE',

    'THINE',

    'WHERE',

    'WHICH',

    'WHOSE',

    'WHOSO',

    'YOURS',

    'YOURS',

    'ADMIT',

    'ADOPT',

    'AGREE',

    'ALLOW',

    'ALTER',

    'APPLY',

    'ARGUE',

    'ARISE',

    'AVOID',

    'BEGIN',

    'BLAME',

    'BREAK',

    'BRING',

    'BUILD',

    'BURST',

    'CARRY',

    'CATCH',

    'CAUSE',

    'CHECK',

    'CLAIM',

    'CLEAN',

    'CLEAR',

    'CLIMB',

    'CLOSE',

    'COUNT',

    'COVER',

    'CROSS',

    'DANCE',

    'DOUBT',

    'DRINK',

    'DRIVE',

    'ENJOY',

    'ENTER',

    'EXIST',

    'FIGHT',

    'FOCUS',

    'FORCE',

    'GUESS',

    'IMPLY',

    'ISSUE',

    'JUDGE',

    'LAUGH',

    'LEARN',

    'LEAVE',

    'LET’S',

    'LIMIT',

    'MARRY',

    'MATCH',

    'OCCUR',

    'OFFER',

    'ORDER',

    'PHONE',

    'PLACE',

    'POINT',

    'PRESS',

    'PROVE',

    'RAISE',

    'REACH',

    'REFER',

    'RELAX',

    'SERVE',

    'SHALL',

    'SHARE',

    'SHIFT',

    'SHOOT',

    'SLEEP',

    'SOLVE',

    'SOUND',

    'SPEAK',

    'SPEND',

    'SPLIT',

    'STAND',

    'START',

    'STATE',

    'STICK',

    'STUDY',

    'TEACH',

    'THANK',

    'THINK',

    'THROW',

    'TOUCH',

    'TRAIN',

    'TREAT',

    'TRUST',

    'VISIT',

    'VOICE',

    'WASTE',

    'WATCH',

    'WORRY',

    'WOULD',

    'WRITE',

    'ABOVE',

    'ACUTE',

    'ALIVE',

    'ALONE',

    'ANGRY',

    'AWARE',

    'AWFUL',

    'BASIC',

    'BLACK',

    'BLIND',

    'BRAVE',

    'BRIEF',

    'BROAD',

    'BROWN',

    'CHEAP',

    'CHIEF',

    'CIVIL',

    'CLEAN',

    'CLEAR',

    'CLOSE',

    'CRAZY',

    'DAILY',

    'DIRTY',

    'EARLY',

    'EMPTY',

    'EQUAL',

    'EXACT',

    'EXTRA',

    'FAINT',

    'FALSE',

    'FIFTH',

    'FINAL',

    'FIRST',

    'FRESH',

    'FRONT',

    'FUNNY',

    'GIANT',

    'GRAND',

    'GREAT',

    'GREEN',

    'GROSS',

    'HAPPY',

    'HARSH',

    'HEAVY',

    'HUMAN',

    'IDEAL',

    'INNER',

    'JOINT',

    'LARGE',

    'LEGAL',

    'LEVEL',

    'LIGHT',

    'LOCAL',

    'LOOSE',

    'LUCKY',

    'MAGIC',

    'MAJOR',

    'MINOR',

    'MORAL',

    'NAKED',

    'NASTY',

    'NAVAL',

    'OTHER',

    'OUTER',

    'PLAIN',

    'PRIME',

    'PRIOR',

    'PROUD',

    'QUICK',

    'QUIET',

    'RAPID',

    'READY',

    'RIGHT',

    'ROMAN',

    'ROUGH',

    'ROUND',

    'ROYAL',

    'RURAL',

    'SHARP',

    'SHEER',

    'SHORT',

    'SILLY',

    'SIXTH',

    'SMALL',

    'SMART',

    'SOLID',

    'SORRY',

    'SPARE',

    'STEEP',

    'STILL',

    'SUPER',

    'SWEET',

    'THICK',

    'THIRD',

    'TIGHT',

    'TOTAL',

    'TOUGH',

    'UPPER',

    'UPSET',

    'URBAN',

    'USUAL',

    'VAGUE',

    'VALID',

    'VITAL',

    'WHITE',

    'WHOLE',

    'WRONG',

    'YOUNG',

    'AFORE',

    'AFTER',

    'BOTHE',

    'OTHER',

    'SINCE',

    'SLASH',

    'UNTIL',

    'WHERE',

    'WHILE',

    'ABACK',

    'ABAFT',

    'ABOON',

    'ABOUT',

    'ABOVE',

    'ACCEL',

    'ADOWN',

    'AFOOT',

    'AFORE',

    'AFOUL',

    'AFTER',

    'AGAIN',

    'AGAPE',

    'AGOGO',

    'AGONE',

    'AHEAD',

    'AHULL',

    'ALIFE',

    'ALIKE',

    'ALINE',

    'ALOFT',

    'ALONE',

    'ALONG',

    'ALOOF',

    'ALOUD',

    'AMISS',

    'AMPLY',

    'AMUCK',

    'APACE',

    'APART',

    'APTLY',

    'AREAR',

    'ASIDE',

    'ASKEW',

    'AWFUL',

    'BADLY',

    'BALLY',

    'BELOW',

    'CANNY',

    'CHEAP',

    'CLEAN',

    'CLEAR',

    'COYLY',

    'DAILY',

    'DIMLY',

    'DIRTY',

    'DITTO',

    'DRILY',

    'DRYLY',

    'DULLY',

    'EARLY',

    'EXTRA',

    'FALSE',

    'FATLY',

    'FEYLY',

    'FIRST',

    'FITLY',

    'FORTE',

    'FORTH',

    'FRESH',

    'FULLY',

    'FUNNY',

    'GAILY',

    'GAYLY',

    'GODLY',

    'GREAT',

    'HAPLY',

    'HEAVY',

    'HELLA',

    'HENCE',

    'HOTLY',

    'ICILY',

    'INFRA',

    'INTL.',

    'JILDI',

    'JOLLY',

    'LAXLY',

    'LENTO',

    'LIGHT',

    'LOWLY',

    'MADLY',

    'MAYBE',

    'NEVER',

    'NEWLY',

    'NOBLY',

    'ODDLY',

    'OFTEN',

    'OTHER',

    'OUGHT',

    'PARTY',

    'PIANO',

    'PLAIN',

    'PLONK',

    'PLUMB',

    'PRIOR',

    'QUEER',

    'QUICK',

    'QUITE',

    'RAMEN',

    'RAPID',

    'REDLY',

    'RIGHT',

    'ROUGH',

    'ROUND',

    'SADLY',

    'SECUS',

    'SELLY',

    'SHARP',

    'SHEER',

    'SHILY',

    'SHORT',

    'SHYLY',

    'SILLY',

    'SINCE',

    'SLEEK',

    'SLYLY',

    'SMALL',

    'SOUND',

    'SPANG',

    'SRSLY',

    'STARK',

    'STILL',

    'STONE',

    'STOUR',

    'SUPER',

    'TALLY',

    'TANTO',

    'THERE',

    'THICK',

    'TIGHT',

    'TODAY',

    'TOMOZ',

    'TRULY',

    'TWICE',

    'UNDER',

    'UTTER',

    'VERRY',

    'WANLY',

    'WETLY',

    'WHERE',

    'WRONG',

    'WRYLY',

    'ABAFT',

    'ABOON',

    'ABOUT',

    'ABOVE',

    'ADOWN',

    'AFORE',

    'AFTER',

    'ALONG',

    'ALOOF',

    'AMONG',

    'BELOW',

    'CIRCA',

    'CROSS',

    'FURTH',

    'MINUS',

    'NEATH',

    'ROUND',

    'SINCE',

    'SPITE',

    'UNDER',];