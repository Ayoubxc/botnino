const axios = require('axios');
const fs = require('fs');
const gtts = require('gtts');

module.exports.config = {
    name: "تحذث",
    version: "1.0.0",
    hasPermission: 1,
    credits: "..",
    description: "..",
    commandCategory: "General",
    dependencies: {
        axios: "^0.24.0"
    },
    cooldowns: 5,
};
  function formatFont(text) {
  const fontMapping = {
    a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒",
      j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛",
      s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
      A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸",
      J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁",
      S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
  };

    let formattedText = "";
    for (const char of text) {
      if (char in fontMapping) {
        formattedText += fontMapping[char];
      } else {
        formattedText += char;
      }
    }

    return formattedText;
  }

module.exports.handleEvent = async function({ api, event }) {
    const { threadID, messageID, body } = event;

    if (event.senderID !== api.getCurrentUserID() && body.endsWith("؟")) {
        const question = body.slice(0, -1);
        const apiUrl = `https://gpt-4-ayoubxnino.replit.app/hercai/api?content=${encodeURIComponent(question)}`;

        try {
            const response = await axios.get(apiUrl);
            const apiResponse = response.data;

            if (apiResponse.reply) {
                const answer = apiResponse.reply;
                if (answer.trim() !== "") {
                    const formattedReply = formatFont(answer);

                    const gttsService = new gtts(formattedReply, 'ar');
                    gttsService.save('../cache/gpt4.mp3 ', function () {
                      api.sendMessage(`🥷🏻 𝗚𝗣𝗧-4 ( ⓃⒾⓃⓄ )\n\n🗨️: ${formattedReply}\n\nاتـمـنـى ان يـفـيـدك هـذا الـجـواب ✨`, event.threadID , event.messageID);

                      api.sendMessage(
                        {
                          attachment: fs.createReadStream('./modules/commands/cache/gpt4_response.mp3'),
                          body: '🔊 ⓃⒾⓃⓄ 𝗚𝗣𝗧-4 ( 𝗩𝗼𝗶𝗰𝗲 )',
                          mentions: [
                            {
                              tag: 'GPT-4 Response',
                              id: api.getCurrentUserID(),
                            },
                          ],
                        },
                        event.threadID, event.messageID
                      );
                    });
                  } else {
                    api.sendMessage("🤖 ⓝⓘⓝⓞ 𝗚𝗣𝗧-4 لا يمكن تقديم رد على استفسارك.", event.threadID);
                  }
            } else {
                api.sendMessage('Received an unexpected API response.', threadID, messageID);
            }
        } catch (error) {
            console.error('Error fetching API:', error);
            api.sendMessage('An error occurred while fetching the response.', threadID, messageID);
        }
    }
};

module.exports.run = async function({ api, event }) {
        }
