const {
  spawn
} = require("child_process");
const http = require("http");
const axios = require("axios");
const logger = require('./utils/log');
const dashboard = http.createServer(function (_0x4a257d, _0xf20805) {
  _0xf20805.writeHead(0xc8, 'OK', {
    'Content-Type': "text/plain"
  });
  _0xf20805.write('🥷🏻 NINO 🐦‍⬛ BOT 🐦‍⬛ AYOUB 🥷🏻');
  _0xf20805.end();
});
dashboard.listen(process.env.PORT || 8080);
logger("تـم تـشـغـيـل  الـبـوت ✅", "[          ┏━━╮┏┓┏┓┏━━╮┏┓ ╭━┓┏━╮                      ┃┏╮┃┃┃┃┃┃┏╮┃┃┃ ┃╭┛┗╮┃                      ┃┃┃╰┛┃┃┃┃┃┃╰┛┃ ┃╰┓┏╯┃                      ┗┛╰━━┛┗┛┗┛╰━━┛ ╰━┛┗━╯         ]");
function startBot(_0x2ed961) {
  if (_0x2ed961) {
    logger(_0x2ed961, "[ تـم تطويره بواسطة أيوب ]");
  } else {
    '';
  }
  const _0xe3e7c0 = spawn("node", ["--trace-warnings", "--async-stack-traces", 'mirai.js'], {
    'cwd': __dirname,
    'stdio': "inherit",
    'shell': true
  });
  _0xe3e7c0.on("close", _0x4432ae => {
    if (_0x4432ae != 0x0 || global.countRestart && global.countRestart < 0x5) {
      startBot("Ayoub shadow is black...");
      global.countRestart += 0x1;
      return;
    } else {
      return;
    }
  });
  _0xe3e7c0.on('خطأ في بوت نينو', function (_0x4e4d41) {
    logger("An Ǻ Ꭹ Ꭷ Ꮼ Ᏸ Boss nino bot error occurred: " + JSON.stringify(_0x4e4d41), "[          ┏━━╮┏┓┏┓┏━━╮┏┓ ╭━┓┏━╮                      ┃┏╮┃┃┃┃┃┃┏╮┃┃┃ ┃╭┛┗╮┃                      ┃┃┃╰┛┃┃┃┃┃┃╰┛┃ ┃╰┓┏╯┃                      ┗┛╰━━┛┗┛┗┛╰━━┛ ╰━┛┗━╯         ]");
  });
}
;
axios.get("https://raw.githubusercontent.com/shaonahmed47/Shaon-bypass-/main/package.json").then(_0x2724e1 => {});
startBot();
