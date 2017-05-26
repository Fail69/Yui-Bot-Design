const Discord = require("discord.js");
const yui = new Discord.Client({
  disableEveryone: true,
messageCacheMaxSize: 500,
messageCacheLifetime: 120,
messageSweepInterval: 60
});
const token = 'token'
const config = require("./config.json");
const fs = require("fs");
let points = JSON.parse(fs.readFileSync('./points.json', 'utf8'));
const prefix = "y.";
const newUsers = [];
const hook = new Discord.WebhookClient('token', 'id');

// Send a message using the webhook
hook.send('I am now alive!');

function commandIs(str, msg){
  return msg.content.toLowerCase().startsWith(config.prefix + str);
}

function pluck(array) {
  return array.map(function(item) { return item["name"]; });
}


function hasRole(mem, role) {
  if(pluck(mem.roles).includes(role)){
    return true;
  } else {
    return false;
  }
}
yui.on("ready", function() {
  var ProgressBar = require('progress')


  var list = [
    'nodes', 'points', 'config', 'modules', 'prefix',
    'fuck her right in the pussy', 'completed'
  ]

  var bar = new ProgressBar(':percent :eta downloading :current/:total :file', {
    total: list.length
  })

  var id = setInterval(function (){
    bar.tick({
      'file': list[bar.curr]
    })
    if (bar.complete) {
      clearInterval(id)
    }
  }, 500);
  yui.users.get("131403526411780096");
  yui.user.setStatus("online");
  console.log("-----");
	console.log("Yui just started!");
  console.log('Prefix: "'+config.prefix+'"')
yui.user.setGame("Use "+config.prefix+"help");
console.log("Guilds on: "+yui.guilds.size);
console.log(yui.guilds.map(g=>g.name).join("\n"));
console.log("---------------");
});
yui.on("message", msg => {
  if(commandIs("invlink", msg)) {
    msg.channel.send(`You can invite me with this ${config.invLink}`)
  }
})
yui.on("message", msg => {
  if (!msg.guild) return;
  if (msg.author.bot) return;

  if (!points[msg.author.id]) points[msg.author.id] = {
    points: 0,
    level: 0
  };
  let userData = points[msg.author.id];
  userData.points++;

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    userData.level = curLevel;
    msg.reply("", {embed: {
    color: 5497106,
      title: "Level up!",
      description: `${msg.author.username}, You have just leveled up to level **${curLevel}**! good job, goshoujin-sama!`
  }
})
}
if (msg.content.startsWith(prefix + "lvl")) {
  msg.channel.send("", {embed: {
  color: 3447003,
  author: {
    name: msg.author.username,
    icon_url: msg.author.avatarURL
  },
    title: "Goshoujin-sama's actual level",
    description: `Your actual level is ${userData.level}, with ${userData.points} points, goshoujin-sama.`
}
})
}
  fs.writeFile('./points.json', JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });
});
yui.on("message", msg => {
  if(commandIs("traps", msg)) {
    var sayings = ["https://cdn.discordapp.com/attachments/290692704755646474/317709811150225408/520.jpg",
                   "https://cdn.discordapp.com/attachments/290692704755646474/317709627577991169/Jorge.png",
                   "https://cdn.discordapp.com/attachments/290692704755646474/317709990632882176/17553805_1272709902784418_6800477749161082656_n.jpg",
                   "https://cdn.discordapp.com/attachments/290692704755646474/317710253900955649/Felix.Argyle.full.2018176.jpg",
                   "https://cdn.discordapp.com/attachments/290692704755646474/317710358204907522/full_body_3_by_matthewrock-d81swlo.jpg",
                   "https://cdn.discordapp.com/attachments/290692704755646474/317713240421564417/35f2f5baeebf98f20efd70f49ac884e0fe263add_hq.jpg"];

    var result = Math.floor((Math.random() * sayings.length) + 0); {
      msg.channel.send(sayings[result]);
    }
  }
});
yui.on('message', msg => {
  if (!msg.guild) return;
  if (commandIs('join', msg)) {
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join().then(connection => {
        const receiver = connection.createReceiver();
        msg.channel.send(`${msg.author.username} I have successfully connected to your channel!`);
    })
        .catch(console.log);
    } else {
      msg.channel.send(`${msg.author.username}, You need to join a voice channel first!`);
    }
  }
});
yui.on('guildMemberAdd', member => {
  member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);
});
yui.on("message", msg => {
if(commandIs("delete", msg)){
  var args = msg.content.split(/[ ]+/);
    if(hasRole(msg.member, "Administrador") || hasRole(msg.member, "Moderador") || hasRole(msg.member, "Dueños") || hasRole(msg.member, "Yui Team Dev")){
        if(args.length >=3){
            msg.channel.send('You defined too many arguments. Usage: `y.delete (number of messages to delete)`');
        } else {
            var msg;
            if(args.length === 1){
                msg=2;
            } else {
                msg=parseInt(args[1]) + 1;
            }
            msg.channel.fetchMessages({limit: msg}).then(messages => msg.channel.bulkDelete(message)).catch(console.error);
            }
            }
        }
});
yui.on("guildCreate", guild => {
  console.log(`New guild added "${guild.name}"", owned by ${guild.owner.user.username}`);
});
yui.on('message', msg => {
  if (commandIs('maths', msg)) {
    let args = msg.content.split(" ").slice(1);
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce((p, c) => p+c);
    msg.channel.send('(calculating...)');
    msg.channel.send(total);
  }

});

yui.on('message', msg => {
  if (msg.content === 'Tadaima') {
    msg.channel.send(`Okaerinasaimase, ${msg.author.username}-sama`);
  }
});
yui.on('message', msg => {
  if (msg.content === 'Yui, te amo') {
    msg.channel.send(`Yo también, ${msg.author.username}, pero, solo soy un robot. Ve y consigue una novia real, nii-san.`);
  }

});
yui.on('message', msg => {
  if(commandIs("traps", msg)) {
    msg.channel.send(`This is what you were looking for? onii-san: http://i64.tinypic.com/2mxjvq0.jpg`)
  }
});
yui.on('message', msg => {
  if (msg.content === 'Yui, i love you') {
    msg.channel.send(`Me too, ${msg.author.username}, but, i am just a robot. Go outside and get a real girlfriend, nii-san.`);
  }

});
yui.on('message', msg => {
  if (commandIs('wtf', msg)) {
    msg.channel.send('http://i66.tinypic.com/2crlhe9.jpg');
  }

});
yui.on('message', msg => {
  if (msg.content === 'deleto this') {
    msg.channel.send('http://i65.tinypic.com/smrbmc.jpg');
  }

});
yui.on('message', msg => {
  if (msg.content === 'Bait za dasto') {
    msg.channel.send('http://i63.tinypic.com/2w5qcmh.jpg');
  }

});
yui.on('message', msg => {
  if (msg.content === 'bait za dasto') {
    msg.channel.send('http://i63.tinypic.com/2w5qcmh.jpg');
  }

});
yui.on('message', msg => {
  if (msg.content === 'nani?') {
    msg.channel.send('http://i63.tinypic.com/50fe2p.png');
  }

});
yui.on('message', msg => {
  if (msg.content === 'Nani?') {
    msg.channel.send('http://i63.tinypic.com/50fe2p.png');
  }

});
yui.on('message', msg => {
  if (msg.content === 'Deleto this') {
    msg.channel.send('http://i65.tinypic.com/smrbmc.jpg');
  }

});
yui.on('message', msg => {
  if (commandIs('avatar', msg)) {
    msg.channel.send(msg.author.avatarURL);
  }
});
yui.on('message', msg => {
  if (msg.content === 'Buenas') {
    msg.channel.send(`Buenos días/tardes/noches, ${msg.author.username}`);
  }
});
yui.on('message', msg => {
  if (msg.content === 'Malas') {
    msg.channel.send(`Malos tardes/días/noches, ${msg.author.username}`);
  }
});
yui.on('message', msg => {
  if (msg.content === 'malas') {
    msg.channel.send(`Malas tardes/días/noches, ${msg.author.username}`);
  }
});

yui.on('message', msg => {
  if (msg.content === 'buenas') {
    msg.channel.send(`Buenos días/tardes/noches, ${msg.author.username}`);
  }
});
yui.on('message', msg => {
  var args = msg.content.split(/[ ]+/);
  if(commandIs('saydl', msg)) {
    msg.delete();
    if(hasRole(msg.member, "@everyone")){
      if(args.length === 1){
        msg.channel.send('You did not use it properly. Usage: `y.saydl (message you want to say)`');
    } else {
        msg.channel.send(args.join(" ").substring(7));
      }
    } else {
    msg.channel.send('You, pleb, do not have the minimum role to do this action');
  }
}
});
yui.on('message', msg => {
  var args = msg.content.split(/[ ]+/);
  if(commandIs('nsay', msg)) {
    if(args.length === 1){
      msg.channel.send('You did not use it properly. Usage: `y.nsay (message you want to say)`');
      } else {
        msg.channel.send(args.join(" ").substring(6));
  }
}
});
yui.on('message', msg => {
  if (msg.content === 'tadaima') {
    msg.channel.send(`Okaerinasaimase, ${msg.author.username}-sama`);
  }
  if (msg.content === 'tadaima onee-chan!') {
    msg.channel.send('Okaerinasai onii-chan, gohan ni suru? Furare suru? Soretomo... WA-TA-SHI');
  }
});
yui.on('message', msg => {
  if (msg.content === 'Tadaima onee-chan!') {
    msg.channel.send('Okaerinasai onii-chan, gohan ni suru? Furare suru? Soretomo... WA-TA-SHI');
  }
});

yui.on('message', msg => {
  if (msg.content === 'Send nudes') {
    msg.reply('http://i68.tinypic.com/514l1w.png');
  }
})
yui.on('message', msg => {
  if (msg.content === 'send nudes') {
    msg.reply('http://i68.tinypic.com/514l1w.png');
  }
});
yui.on('message', msg => {
  if (commandIs('weather', msg)) {
    msg.channel.send(`http://i67.tinypic.com/51ock.png`);
  }
});
yui.on('message', msg => {
  if (msg.content === 'profanar') {
    msg.reply('YAMETE!!!!');
  }
})
yui.on('message', msg => {
  if (msg.content === 'Profanar') {
    msg.reply('YAMETE!!!!');
  }
});
yui.on('message', msg => {
  if (msg.content === 'Yui') {
    msg.channel.send('Hai, hai, onii-chan');
  }
});
yui.on('message', msg => {
  if (msg.content === 'Nanda kore wa?') {
    msg.channel.send('http://i65.tinypic.com/2qxuddu.jpg');
  }
})
yui.on('message', msg => {
  if (msg.content === 'nanda kore wa?') {
    msg.channel.send('http://i65.tinypic.com/2qxuddu.jpg');
  }
});
yui.on('message', msg => {
  if (msg.content === 'Yamete') {
    msg.channel.send('kudasai, nii-san!!');
  }
})
yui.on('message', msg => {
  if (msg.content === 'yamete') {
    msg.channel.send('kudasai, nii-san!!');
  }
});
yui.on('message', msg => {
  if (commandIs("help", msg)) {
    msg.author.send("Prefix: `y.`" +
            "\nThings I can do:" +
    				"\n\n`help` - Shows what I can do" +
    				"\n`weather` - Shows (ONLY) Memeburgo's weather" +
    				"\n`saydl` - The bot sends a message, and automatically deletes the command used" +
    				"\n`nsay` - The bot sends a message, but it doesn't deletes the command used" +
            "\n`traps` - Sends a handsome trap ;)" +
            "\n`tsay` - Sends message, and deletes the command used (only for Yui Team Dev)" +
            "\n`roll` - Roll a number between 1-100" +
            "\n`flip` - Flip a coin" +
            "\n`maths` - Just to add numbers to each other's (e.g. `y.maths 1 2 3`)" +
            "\n`8ball` - Ask the magic 8ball a question" +
            "\n`join` - I will join to your channel" +
            "\n`lvl` - shows your actual level" +
            "\n`invlink` - invitation link" +
    				"\n`avatar` - Sends your profile picture");
    msg.channel.send(`${msg.author.username}: Succesfully sent a P.M. with the commands to you`);
  }
});
yui.on('message', msg => {
if(commandIs("flip", msg)) {
  var result = Math.floor((Math.random() * 2) + 1);
  if (result == 1) {
    msg.channel.send("The coin landed on heads");
  }
  if (result == 2) {
    msg.channel.send("The coin landed on tails");
  }
}
});
yui.on('message', msg => {
  if (msg.content === "Vientos ;v") {
    msg.channel.send('http://i65.tinypic.com/sd22xh.jpg');
  }
});
yui.on('message', msg => {
if(commandIs("roll", msg)) {
  var result = Math.floor((Math.random() * 100) + 1);
  msg.channel.send(`${msg.author.username} You rolled a: ` + result);
}
});
yui.on('message', msg => {
if(commandIs("8ball", msg)) {
    var args = msg.content.split(/[ ]+/);
    if(args.length === 1){
      msg.channel.send('You did not use it properly. Usage: `y.8ball do you like traps?`');
            } else {
  var sayings = ["Yes",
                 "No",
                 "I don't think so, goshoujin-sama",
                 "Very doubtful, goshoujin-sama",
                 "I am in doubt of that, goshoujin-sama",
                 "I do not even know, i just want your love, goshoujin-sama"];

  var result = Math.floor((Math.random() * sayings.length) + 0); {
  msg.channel.send(`${msg.author.username} ` + sayings[result]);
}
}
}
});
yui.on('message', msg => {
  if (msg.content === "vientos ;v") {
    msg.channel.send('http://i65.tinypic.com/sd22xh.jpg');
  }
});
yui.on('message', msg => {
  if (msg.content === "vientos ;)") {
    msg.channel.send('http://i65.tinypic.com/sd22xh.jpg');
  }
});
yui.on('message', msg => {
  if (msg.content === "Vientos ;)") {
    msg.channel.send('http://i65.tinypic.com/sd22xh.jpg');
  }
});
yui.on('message', msg => {
  if (msg.content === "vientos") {
    msg.channel.send('http://i65.tinypic.com/sd22xh.jpg');
  }
});
yui.on('message', msg => {
  if (msg.content === "Vientos") {
    msg.channel.send('http://i65.tinypic.com/sd22xh.jpg');
  }
});
yui.on('message', msg => {
  if (msg.content === "Dejate de mamadas onii-chan") {
    msg.channel.send('http://i63.tinypic.com/2djv59y.jpg');
  }
});
yui.on('message', msg => {
  if (msg.content === "Me gustan los trenes") {
    msg.channel.send('http://i65.tinypic.com/2mdnoec.jpg, aquí tienes, nii-san');
  }
});
yui.on('message', msg => {
  if (msg.content === "me gustan los trenes") {
    msg.channel.send('http://i65.tinypic.com/2mdnoec.jpg, aquí tienes, nii-san');
  }
});
yui.on('message', msg => {
  if (msg.content === "nel") {
    msg.channel.send('Pastel :birthday:');
  }
});
yui.on('message', msg => {
  if (msg.content === "Nel") {
    msg.channel.send('Pastel :birthday:');
  }
});
yui.on('message', msg => {
  if (msg.content === "dejate de mamadas onii-chan") {
    msg.channel.send('http://i63.tinypic.com/2djv59y.jpg');
  }
});
yui.on('message', msg => {
  if (msg.content === 'BAN') {
    msg.channel.send('A la BIN, a la BAN, a la BIN, BON, BAN.');
  }
})
yui.on('message', msg => {
  if (msg.content === 'あいしてるゆい') {
    msg.channel.send('すみませんが、私は失敗を愛します');
  }
})
yui.on('message', msg => {
  if (msg.content === 'Si, bueno... quien tiene hambre?') {
    msg.channel.send('¡Yo!');
  }
})
yui.on('message', msg => {
  if (msg.content === 'ban') {
    msg.channel.send('A la BIN, a la BAN, a la BIN, BON, BAN.');
  }
})
yui.on('message', msg => {
  if (msg.content === 'BAN BAN') {
    msg.channel.send('Biri biri biri biri biri biri biri biri biri... BAN BAN!!');
  }
})
yui.on('message', msg => {
  if (msg.content === 'banhammer'){
    msg.channel.send('Las ruedas del camión girando BAN.')
  }
});
yui.on('message', msg => {
  if (msg.content === 'Laura Sad'){
    msg.channel.send('http://i65.tinypic.com/2qsxjrn.png')
  }
});
yui.on('message', msg => {
  if (msg.content === 'laura sad'){
    msg.channel.send('http://i65.tinypic.com/2qsxjrn.png')
  }
});
yui.on('message', msg => {
  if(commandIs("fail", msg)) {
    msg.channel.send('He is my creator.')
  }
});
yui.on('message', msg => {
  var args = msg.content.split(/[ ]+/);
  if(commandIs("tsay", msg)) {
    if(msg.author.id !== "id") return; {
    msg.delete();
  }
    msg.channel.send(`**Yui Team Dev's message[Name]:** ` + '***`' + args.join(" ").substring(6) + '`***');
}
});
yui.on('message', msg => {
  if(msg.content === "bai") {
    msg.channel.send("Adiós, onii-sama.")
  }
});
yui.on('message', msg => {
  if(msg.content === "Bai") {
    msg.channel.send("Adiós, onii-sama.")
  }
});
yui.on('message', msg => {
  var args = msg.content.split(/[ ]+/);
  if(commandIs("tsay", msg)) {
    if(msg.author.id !== "id") return; {
    msg.delete();
  }
  msg.channel.send("", {embed: {
  color: 6385317,
  author: {
    name: msg.author.username,
    icon_url: msg.author.avatarURL
  },
  title: "Yui Team Dev",
  description: args.join(" ").substring(6),
  timestamp: new Date(),
  footer: {
    icon_url: msg.author.avatarURL
  }
}
})
}
});
yui.on('message', msg => {
  var args = msg.content.split(/[ ]+/);
  if(commandIs("tsay", msg)) {
    if(msg.author.id !== "id") return; {
    msg.delete();
  }
    msg.channel.send("", {embed: {
    color: 4201335,
    author: {
      name: msg.author.username,
      icon_url: msg.author.avatarURL
    },
    title: "Yui Team Dev",
    description: args.join(" ").substring(6),
    timestamp: new Date(),
    footer: {
      icon_url: msg.author.avatarURL
    }
  }
})
}
});
yui.on('message', msg => {
  var args = msg.content.split(/[ ]+/);
  if(commandIs("tsay", msg)) {
    if(msg.author.id !== "id") return; {
    msg.delete();
  }
  msg.channel.send("", {embed: {
  color: 2564779,
  author: {
    name: msg.author.username,
    icon_url: msg.author.avatarURL
  },
  title: "Yui Team Dev",
  description: args.join(" ").substring(6),
  timestamp: new Date(),
  footer: {
    icon_url: msg.author.avatarURL
  }
}
})
}
});
yui.on('message', msg => {
  var args = msg.content.split(/[ ]+/);
  if(commandIs("tsay", msg)) {
    if(msg.author.id !== "id") return; {
    msg.delete();
  }
  msg.channel.send("", {embed: {
  color: 5703174,
  author: {
    name: msg.author.username,
    icon_url: msg.author.avatarURL
  },
  title: "Yui Team Dev",
  description: args.join(" ").substring(6),
  timestamp: new Date(),
  footer: {
    icon_url: msg.author.avatarURL
  }
}
})
}
});
yui.on('message', message => {
  const prefix = "y.";
  const args = message.content.split(" ").slice(1);

  if (message.content.startsWith(prefix + "eval")) {
    if(message.author.id !== config.ownerID) return;
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
}); // END MESSAGE HANDLER

function clean(text) {
  if (typeof(text) === "string")
   return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
   else
     return text;
}
yui.login(config.token);
