module.exports.config = {
  name: "مواعدة",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "ǺᎩᎧᏬᏰ",
  description: "للقضاء على لعزوبية",
  commandCategory: "العاب",
  usages: "[info/breakup/diemdanh/top date/top point]",
  cooldowns: 5
};

function msgBreakup() {
    var msg = ['حقا، شخصان لا يمكن أن يتصالحا?', 'هكذا، اتركوا أيدي بعضكم البعض?', 'لا يضر؟ نعم؟ فلماذا لا تزال ترغب في ترك؟?', 'لسبب ما... هل يمكنكما محاولة الزواج؟? ^^']
    return msg[Math.floor(Math.random() * msg.length)];
}

function getMsg() {

    return `أرجــو مـن الـحاضـريـن تـهـنـئـة هـذيـن الـزوجـيـن ❤👩‍❤️‍👨  \n\n☜مـلاحـظـات☞:\n- لن يتمكن كل منكما من الانفصال خلال 7 أيام من البداية.🫣\n- سأعمل أكثر، وأجلب المزيد من الأشياء المثيرة للاهتمام حول هذه المواعدة من مساعدتكما على الاستمتاع و المزيد من المرح معًا.\n- أخيرًا، شكرًا لك على استخدام الروبوت وأتمنى لكما السعادة 🥰`
}

module.exports.handleReaction = async function({ api, event, Threads, Users, Currencies, handleReaction }) {
    var { threadID, userID, reaction,messageID } = event;
    var { turn } = handleReaction;
    switch (turn) {
        case "مباراة":
            api.unsendMessage(handleReaction.messageID);
            var { senderID, coin, senderInfo, type } = handleReaction;
            if (senderID != userID) return;
            await Currencies.setData(senderID, { money: coin - 200 });
            var data = await Threads.getInfo(threadID);
            var { userInfo } = data;
            var doituong = [];
            for (var i of userInfo) {
                var uif = await Users.getInfo(i.id);
                var gender = '';
                if (uif.gender == 1) gender = "بنت";
                if (uif.gender == 2) gender = "ولد"; 
                if (uif.dating && uif.dating.status == true) continue;
                if (gender == type) doituong.push({ ID: i.id, name: uif.name });
            }
            if (doituong.length == 0) return api.sendMessage(`لسوء الحظ، الشخص الذي تبحث عنه غير متوفر أو أنه يواعد شخصًا آخر بالفعل 🙁💔`, threadID);
            var random = doituong[Math.floor(Math.random() * doituong.length)];
            var msg = {
                body: `${senderInfo.name} - الـشـخـص الـذي أخـتـاره الـبـوت لـك هـو👀: ${random.name}\nنـسـبـة الـملائـمة🤯: ${Math.floor(Math.random() * (80 - 30) + 30)}%\n\nإذا وافـق كـلا االـشـخـصـيـن، فـليـضـعـا قـلـبـا (❤) عـلى هـذه الـرسـالـة لـبـدء الـمـواعـدة 🫂.`,
                mentions: [ { tag: random.name, id: random.ID }, { tag: senderInfo.name, id: senderID } ]
            }
            return api.sendMessage(msg, threadID, (error, info) => {
                global.client.handleReaction.push({ name: this.config.name, messageID: info.messageID, turn: "يقبل", user_1: { ID: senderID, name: senderInfo.name, accept: false }, user_2: { ID: random.ID, name: random.name, accept: false } });
            });
        case "يقبل":
            var { user_1, user_2 } = handleReaction;
            if (reaction != '❤') return;
            if (userID == user_1.ID) user_1.accept = true;
            if (userID == user_2.ID) user_2.accept = true;
            if (user_1.accept == true && user_2.accept == true) {
                api.unsendMessage(handleReaction.messageID);
                var infoUser_1 = await Users.getData(user_1.ID);
                var infoUser_2 = await Users.getData(user_2.ID);
                infoUser_1.data.dating = { status: true, mates: user_2.ID, time: { origin: Date.now(), fullTime: global.client.getTime('fullTime') } };
                infoUser_2.data.dating = { status: true, mates: user_1.ID, time: { origin: Date.now(), fullTime: global.client.getTime('fullTime') } };
                return api.sendMessage(`أطـلـق كـل مـنـهـما مـشـاعره مـعـا مـمـا يـعـنـي أن كـلاهـمـا وافـق عـلـى الـذهـاب فـي مـوعـد 🕺🏻💃🏻.`, threadID, async (error, info) => {
                    await Users.setData(user_1.ID, infoUser_1);
                    await Users.setData(user_2.ID, infoUser_2);
                    api.changeNickname(`${user_2.name} - يـتـواعـد مـع ${user_1.name}`, threadID, user_2.ID);
                    api.changeNickname(`${user_1.name} - يـتـواعـد مـع ${user_2.name}`, threadID, user_1.ID);
                    api.sendMessage(getMsg(), threadID);
                });
            }
            break;
        case 'انفصل':
            var { userInfo, userMates, user_1, user_2 } = handleReaction;
            if (userID == user_1.ID) user_1.accept = true;
            if (userID == user_2.ID) user_2.accept = true;
            if (user_1.accept == true && user_2.accept == true) {
                api.unsendMessage(handleReaction.messageID);
                userInfo.data.dating = { status: false };
                userMates.data.dating = { status: false };
                return api.sendMessage(`أن نكون معًا في الأوقات العاصفة، ولكن لا نكون قادرين على الحصول على بعضنا البعض بعد انتهاء المطر🥹💙\n لا تحزن، في بعض الأحيان، وجود أوقات نتفق فيها ثم ننهار يجعلنا أقوى. 🤧💌`, threadID, async () => {
                    await Users.setData(user_1.ID, userInfo);
                    await Users.setData(user_2.ID, userMates);
                    api.changeNickname("", threadID, user_1.ID);
                    api.changeNickname("", threadID, user_2.ID);
                   // khi chia tay nó sẽ xóa biệt danh của 2 người//
                })
            }
            break;
        default:
            break;
    }
}

module.exports.run = async function({ api, event, args, Users, Currencies }) {
    var { threadID, messageID, senderID } = event;
    var senderInfo = await Users.getData(senderID);
    var type = ''
    switch (args[0]) {
        case "ولد":
        case "ذكر":
            if (senderInfo.data.dating && senderInfo.data.dating.status == true) return api.sendMessage(`هل تريد الديوث شخص ما؟ أثناء وجودي في وضع المواعدة، ما زلت أرغب في العثور على أشخاص آخرين?`, threadID, messageID);
            type = "ولد";
            break;
        case "بنت":
        case "انثى":
        case "nu":
        case "Nu":
            if (senderInfo.data.dating && senderInfo.data.dating.status == true) return api.sendMessage(`هل تريد الديوث شخص ما؟ أثناء وجودي في وضع المواعدة، ما زلت أرغب في العثور على أشخاص آخرين?`, threadID, messageID);
            type = "بنت";
            break;
        case "انفصل":
            var userInfo = await Users.getData(senderID);
            if (!userInfo.data.dating || userInfo.data.dating && userInfo.data.dating.status == false) return api.sendMessage(`Bạn chưa hẹn hò với ai thì đòi breakup cái gì?`, threadID, messageID);
            if (Date.now() - userInfo.data.dating.time.origin < 604800000) return api.sendMessage(`لم يمر حتى 7 أيام وتريد الانفصال بالفعل? 🥺😾\n\n${msgBreakup()}\n\nفقط فكر بهدوء، ودع الأمور تهدأ تدريجيًا وحلها معًا. لو سمحت? 🤗🤍`, threadID, messageID);
            var userMates = await Users.getData(userInfo.data.dating.mates);
            return api.sendMessage(`ألا تستطيعان الاستمرار حقاً؟\nإذا قرأت هذه الرسالة، اتركها هناك... اصمت للحظة، فكر جيداً...\nهناك أشياء كثيرة. .. بمجرد فقدانها، لن يتم العثور عليها أبداً مرة أخرى... ^^\n\nوإذا... لا زلت غير قادر على الاستمرار... كلاكما، من فضلك ضع مشاعرك في هذه الرسالة من فضلك...`, threadID, (error, info) => {
                global.client.handleReaction.push({ name: this.config.name, messageID: info.messageID, userInfo: userInfo, userMates: userMates, turn: 'انفصل', user_1: { ID: senderID, accept: false }, user_2: { ID: userInfo.data.dating.mates, accept: false } })
            }, messageID);
        case "معلومات":
            var userInfo = await Users.getData(senderID);
            if (!userInfo.data.dating || userInfo.data.dating && userInfo.data.dating.status == false) return api.sendMessage(`ما هي المعلومات التي تطلبها؟?`, threadID, messageID);
            var infoMates = await Users.getData(userInfo.data.dating.mates);
            var fullTime = userInfo.data.dating.time.fullTime;
            fullTime = fullTime.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/);
            fullTime = fullTime[0].replace(/\//g, " ").split(' ');
            var date = fullTime[0], month = fullTime[1] - 1, year = fullTime[2];
            var dateNow = global.client.getTime('تاريخ'), monthNow = global.client.getTime('شهر') - 1, yearNow = global.client.getTime('سنة');
            var date1 = new Date(year, month, date);
            var date2 = new Date(yearNow, monthNow, dateNow);
            var msg = `===『 حـالـة الـمـواعـدة 』===\n\n──────────────` +
            `🤵 أسـمـك: ${userInfo.name}\n` +
            `👸 أسـمـها: ${infoMates.name}\n` +
            `⏰ وقـت بـدء الـمـواعـدة: ${userInfo.data.dating.time.fullTime}\n` +
            `💑 كـنـا سـويا: ${parseInt((date2 - date1) / 86400000)} يوم\n` +
            `${userInfo.data.dating.lovepoint ? `️🎖️ نـقـاط الـعـلاقـة🪙 : ${userInfo.data.dating.lovepoint} نقطة.` : ''}`
            return api.sendMessage({ body: msg, attachment: await this.canvas(senderID, userInfo.data.dating.mates)}, threadID, messageID);
        case 'الافضل':
            if (args[1] == 'نقطة') {
                var data = await Users.getAll(['userID', 'data', 'name']);
                var topDating = [];
                for (var i of data) {
                    if (i.data !== null && i.data.dating && i.data.dating.lovepoint) {
                        if (topDating.some(item => item.userID == i.data.dating.mates)) continue;
                        else topDating.push(i);
                    }
                }
                if (topDating.length == 0) return api.sendMessage(`لا توجد حاليا أي بيانات عن الأزواج 🤧💔.`, threadID, messageID);
                topDating.sort((a, b) => b.data.dating.lovepoint - a.data.dating.lovepoint);
                var msg = `فيما يلي أفضل 5 أزواج حصلوا على أعلى درجات العلاقة 🫂:\n\n`, number = 1;
                for (var i of topDating) {
                    if (number < 6) {
                        var infoMates = await Users.getData(i.data.dating.mates);
                        msg += `${number++}. ${i.name} و ${infoMates.name}: ${i.data.dating.lovepoint} نقاط.\n`;
                    }
                }
                return api.sendMessage(msg, threadID);
            }
            if (args[1] == 'تاريخ') {
                var data = await Users.getAll(['userID', 'data', 'name']);
                var topDating = [];
                for (var i of data) {
                    if (i.data !== null && i.data.dating && i.data.dating.lovepoint) {
                        i.data.dating.time.fullTime = calcTime(i.data.dating.time.fullTime);
                        if (topDating.some(item => item.userID == i.data.dating.mates)) continue;
                        else topDating.push(i);
                    }
                }
                if (topDating.length == 0) return api.sendMessage(`لا توجد حاليا أي بيانات عن الأزواج 🤧💔.`, threadID, messageID);
                topDating.sort((a, b) => b.data.dating.time.fullTime - a.data.dating.time.fullTime);
                var msg = `فيما يلي أفضل 5 أزواج واعدوا لفترة أطول 🕑:\n\n`, number = 1;
                for (var i of topDating) {
                    if (number < 6) {
                        var infoMates = await Users.getData(i.data.dating.mates);
                        msg += `${number++}. ${i.name} و ${infoMates.name}: ${i.data.dating.time.fullTime} يوم.\n`;
                    }
                }
                return api.sendMessage(msg, threadID);
            }
        case 'حضور':
            var info = await Users.getData(senderID);
            if (!info.data.dating || info.data.dating && info.data.dating.status == false) return api.sendMessage(`أنا أسأل من الذي سأتلقى مكالمة هاتفية معه 🤳?`, threadID, messageID);
            if (calcTime(info.data.dating.time.fullTime) == info.data.dating.diemdanh) return api.sendMessage(`لقد قمت بالفعل بأخذ الحضور لهذا اليوم، يرجى الانتظار لنصفك الآخر أو العودة غدا 😗.`, threadID, messageID);
            if (!info.data.dating.diemdanh || calcTime(info.data.dating.time.fullTime) > info.data.dating.diemdanh) {
                var infoMates = await Users.getData(info.data.dating.mates);
              console.log(info.data.dating, infoMates.data.dating)
                info.data.dating.diemdanh = calcTime(info.data.dating.time.fullTime);
              console.log(calcTime(info.data.dating.time.fullTime))
                if (info.data.dating.diemdanh == infoMates.data.dating.diemdanh) {
                    if (!info.data.dating.lovepoint || !infoMates.data.dating.lovepoint) {
                        info.data.dating.lovepoint = 10;
                        infoMates.data.dating.lovepoint = 10;
                    } else {
                        info.data.dating.lovepoint += 10;
                        infoMates.data.dating.lovepoint += 10;
                    }
                    await Users.setData(info.userID, info);
                    await Users.setData(infoMates.userID, infoMates);
                    var msg = { body: `${info.name} - ${infoMates.name}\n\nكلاكما قد أخذ الحضور لهذا اليوم، نقاط التقارب +10.`, mentions: [{ id: info.userID, tag: info.name }, { id: infoMates.userID, tag: infoMates.name }] };
                    return api.sendMessage(msg, threadID, messageID);
                }
                await Users.setData(info.userID, info);
                return api.sendMessage(`لقد تم تسجيل الحضور بنجاح، يرجى التذكير ${infoMates.name} خذ الحضور للحصول على نقاط الولاء 🥰.`, threadID, messageID);
            }
            return api.sendMessage(`حدث خطأ أثناء تسجيل الحضور لك.`, threadID, messageID);
        default:
            return api.sendMessage(`يجب عليك إدخال جنس الشخص الذي تريد الاقتران به.`, threadID, messageID);

    }

    var { money } = await Currencies.getData(senderID);
    if (money < 200) return api.sendMessage(`ليس لديك ما يكفي من 200 دولار للبحث عن موضوع جديد.`, threadID, messageID);
    return api.sendMessage(`سيتم خصم 200 دولار منك للبحث عن شخص يناسبك.\nلن يتم استرداد هذا المبلغ إذا لم يوافق أحدكم على الدخول إلى حالة المواعدة.\n\nأرسل مشاعرك في هذه الرسالة للموافقة على البحث عن شخص ما.`, threadID, (error, info) => {
        global.client.handleReaction.push({ name: this.config.name, messageID: info.messageID, senderID: senderID, senderInfo: senderInfo, type: type, coin: money, turn: 'match' })
    }, messageID);
}
module.exports.circle = async (image) => {
  const jimp = require('jimp')
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/gif");
}
module.exports.canvas = async function (idOne, idTwo) {
    const fs = require('fs')
    const axios = require('axios')
    const { loadImage, createCanvas } = require("canvas");
    let path = __dirname + "/cache/ghep.png";
    let pathAvata = __dirname + `/cache/avtghep2.png`;
    let pathAvataa = __dirname + `/cache/avtghep.png`;
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${idOne}/picture?height=250&width=250&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`, { responseType: 'arraybuffer' })).data;
    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${idTwo}/picture?height=250&width=250&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`, { responseType: 'arraybuffer' })).data;
    let bg = ( await axios.get(`https://imgur.com/c7Eppap.png`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
    fs.writeFileSync(pathAvataa, Buffer.from(getAvatarTwo, 'utf-8'));
    fs.writeFileSync(path, Buffer.from(bg, "utf-8"));
    avataruser = await this.circle(pathAvata);
    avataruser2 = await this.circle(pathAvataa);
    let imgB = await loadImage(path);
    let baseAvata = await loadImage(avataruser);
    let baseAvataa = await loadImage(avataruser2);
    let canvas = createCanvas(imgB.width, imgB.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(imgB, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseAvata, 447, 92, 130, 130);
    ctx.drawImage(baseAvataa, 85, 92, 130, 130);
    ctx.beginPath();
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(path, imageBuffer);
    return fs.createReadStream(path)
};


function calcTime(fullTime) {
    fullTime = fullTime.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/);
    fullTime = fullTime[0].replace(/\//g, " ").split(' ');
    var date = fullTime[0], month = fullTime[1] - 1, year = fullTime[2];
    var dateNow = getTime('تاريخ'), monthNow = getTime('شهر') - 1, yearNow = getTime('سنة');
    var date1 = new Date(year, month, date);
    var date2 = new Date(yearNow, monthNow, dateNow);
    return parseInt((date2 - date1) / 86400000);
}

function getTime(option) {
    var moment = require('moment-timezone');
    switch (option) {
        case "ثواني":
            return `${moment.tz("Africa/Casablanca").format("ss")}`;
        case "دقائق":
            return `${moment.tz("Africa/Casablanca").format("mm")}`;
        case "ساعات":
            return `${moment.tz("Africa/Casablanca").format("HH")}`;
        case "تاريخ": 
            return `${moment.tz("Africa/Casablanca").format("DD")}`;
        case "شهر":
            return `${moment.tz("Africa/Casablanca").format("MM")}`;
        case "سنة":
            return `${moment.tz("Africa/Casablanca").format("YYYY")}`;
        case "fullHour":
            return `${moment.tz("Africa/Casablanca").format("HH:mm:ss")}`;
        case "fullYear":
            return `${moment.tz("Africa/Casablanca").format("DD/MM/YYYY")}`;
        case "fullTime":
            return `${moment.tz("Africa/Casablanca").format("HH:mm:ss DD/MM/YYYY")}`;
    }
         }
