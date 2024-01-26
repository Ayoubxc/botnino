const axios = require('axios');
const fs = require('fs');
const gtts = require('gtts');

module.exports.config = {
    name: "تحذث",
    version: "1.0.0",
    hasPermission: 1,
    credits: "ǺᎩᎧᏬᏰ",
    description: "GPT NINO",
    commandCategory: "General",
    dependencies: {
        axios: "^0.24.0"
    },
    cooldowns: 5,
  }, 
module.exports.handleEvent = async function({ api, event }) {
    const { threadID, messageID, body } = event;

    if (event.senderID !== api.getCurrentUserID() && body.endsWith("؟")) {
        const question = body.slice(0, -1);
        const apiUrl = `https://gpt-nino-79cc26976a57.herokuapp.com/hercai/api?content=${encodeURIComponent(question)}`;

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
