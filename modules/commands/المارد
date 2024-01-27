const axios = require('axios');
const cmdN = "المارد"
module.exports = {
  config: {
    name: cmdN,
  version: "1.0.0",
  hasPermission: 0,
  credits: "عمر",
  description: "مارد ازرق",
  usePrefix: true,
  commandCategory: "هيهيهي",
  usages: "Yo",
  cooldowns: 2
  },
 
  run: async function ({ event, api, args }) {
    const gry_server = "https://akenator-da7856313e76.herokuapp.com/game";
 
 
 
 
    const u = {
      user_id: event.senderID,
      answer: "2"
    };
 
    const res = await axios.post(gry_server, u);
 
 
 
 
 
 
 
    const message = res.data.question;
 
    return api.sendMessage({ body: message + " 🦄" },event.threadID, (error, info) => {
      if (!error) {
        global.client.handleReply.push({
          name: cmdN,
          author: event.senderID,
          messageID: info.messageID
        });
      }
    });
  },
 
  handleReply: async function ({ api, event, handleReply }) {
    const { author, messageID } = handleReply;
    if (event.senderID != author) return api.sendMessage('مش لك', event.threadID, event.messageID);
    const gry_server = "https://akenator-da7856313e76.herokuapp.com/game";
    let answer;
 
    switch (event.body) {
      case "نعم":
        answer = "0";
        break;
      case "لا":
        answer = "1";
        break;
      case "لا اعلم":
        answer = "2";
        break;
      case "من الممكن":
        answer = "3";
        break;
        case "الضاهر لا":
        answer = "4";
        break;
 
      default:
        return api.sendMessage("الرجاء الرد ب\n\nنعم | لا | لا اعلم | من الممكن | الضاهر لا", event.threadID, event.messageID);
    }
 
    const u = {
      user_id: event.senderID,
      answer: answer
    };
 
    const res = await axios.post(gry_server, u);
 
if (res.data.result) {
  const name = res.data.result[0].name;
    const des = res.data.result[0].description;
    const imged = await axios.get(res.data.result[0].absolute_picture_path, {responseType :"stream"});
 return api.sendMessage({
 
    body: `اسم الشخصية: ${name}\n\nنبذة عن الشخصية: ${des}`,
    attachment: imged.data
  }, event.threadID, event.messageID)
}
 
    const replyMessage = res.data.question;
 
    return api.sendMessage({ body: replyMessage + " 🧙🏻‍♂️"},event.threadID, (error, info) => {
      if (!error) {
        global.client.handleReply.push(info.messageID, {
          name: cmdN,
          author: event.senderID,
          messageID: info.messageID
        });
      }
    });
  },
};
