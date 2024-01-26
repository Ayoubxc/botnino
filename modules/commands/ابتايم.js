module.exports.config = {
	name: "ابتايم",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "عمر",
	description: "عرض جميع معلومات البوت",
	commandCategory: "خدمات",
	cooldowns: 5,
	dependencies: {
		"pidusage": ""
	}
};

function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.run = async ({ api, event }) => {
	const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);

	const pidusage = await global.nodemodule["pidusage"](process.pid);

	const timeStart = Date.now();
	return api.sendMessage("", event.threadID, () => api.sendMessage(`⌚وقـت الـتـشـغـيـل ${hours}  ساعة و ${minutes} دقيقة و ${seconds} ثانية.✅\n\n❯ عـدد الـمـسـتـخـدمـيـن👥: ${global.data.allUserID.length}✅\n❯ عـدد الـمـجـمـوعـات 💬: ${global.data.allThreadID.length}✅\n❯ إسـتـخـدام الـمـعـالـج 📈: ${pidusage.cpu.toFixed(1)}%✅\n❯ إسـتـخـدام الـرام 📟: ${byte2mb(pidusage.memory)}✅\n❯ الـبـيـنڨ ⬆️ُ⬇️ُ: ${Date.now() - timeStart} وملي ثانية ✅`, event.threadID, event.messageID));
    }
