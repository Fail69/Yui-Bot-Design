const commando = require('discord.js-commando')
const yui = new commando.Client({
  owner: '131403526411780096',
  commandPrefix: 'y.'
})
const dateFormat = require('dateformat');
const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy');
const token = 'MzA1MTA2MDAyMDMyNzIxOTIw.C95gpg.yEKErSOH5Jvhxrp5MV-oHhE6Koo'
const config = require('./config.json')
const fs = require('fs')
const YTDL = require('ytdl-core')
let points = JSON.parse(fs.readFileSync('./points.json', 'utf8'))
const prefix = 'y.'
const ascii = require('ascii-table');
const newUsers = []
const sqlite = require('sqlite');

yui.registry.registerGroup('info', 'Info')
yui.registry.registerGroup('modules', 'Modules')
yui.registry.registerGroup('resolver', 'Resolver')
yui.registry.registerGroup('worker', 'Worker')
yui.registry.registerGroup('misc', 'Misc')
yui.registry.registerGroup('music', 'Music')
yui.registry.registerGroup('nsfw', 'Nsfw')
yui.registry.registerGroup('administration', 'Administration')
yui.registry.registerGroup("dev's commands", "Dev's Commands")
yui.registry.registerGroup('fun', 'Fun')
yui.registry.registerDefaults()
yui.registry.registerCommandsIn(__dirname + '/commands')

function commandIs(str, msg) {
  return msg.content.toLowerCase().startsWith(config.prefix + str)
}

function pluck(array) {
  return array.map(function(item) {
    return item['name']
  })
}

function hasRole(mem, role) {
  if (pluck(mem.roles).includes(role)) {
    return true
  } else {
    return false
  }
}
yui.on('ready', function() {
  var ProgressBar = require('progress')

  var list = [
    'nodes', 'points', 'config', 'modules', 'prefix',
    'fuck her right in the pussy', 'completed'
  ]

  var bar = new ProgressBar(':percent :eta downloading :current/:total :file', {
    total: list.length
  })

  var id = setInterval(function() {
    bar.tick({
      'file': list[bar.curr]
    })
    if (bar.complete) {
      clearInterval(id)
    }
  }, 500)
  yui.users.get('131403526411780096')
  yui.user.setStatus('online')
  console.log("-----");
  console.log("Yui just started!");
  console.log('Prefix: "' + config.prefix + '"')
  yui.user.setGame('y.help <command/all>');
  console.log("Guilds on: " + yui.guilds.size);
  console.log(yui.guilds.map(g => g.name).join("\n"));
  console.log('---------------')
});
//Console Log codes part
yui.on("message", msg => {
  if (!msg.guild) return;
  if (msg.content.startsWith(prefix)) {
    console.log(`\n${msg.author.username} used a command from ${msg.guild.name}`)
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
    msg.reply('', {
      embed: {
        color: 5497106,
        title: ":sun_with_face: | Level up!",
        description: `${msg.author.username}, You have just leveled up to level **${curLevel}**! good job, goshoujin-sama!`
      }
    })
  }
  fs.writeFile('./points.json', JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });
});
yui.on("message", msg => {
  if (commandIs("traps", msg)) {
    var sayings = ["https://cdn.discordapp.com/attachments/290692704755646474/317709811150225408/520.jpg",
      "https://cdn.discordapp.com/attachments/290692704755646474/317709627577991169/Jorge.png",
      "https://cdn.discordapp.com/attachments/290692704755646474/317709990632882176/17553805_1272709902784418_6800477749161082656_n.jpg",
      "https://cdn.discordapp.com/attachments/290692704755646474/317710253900955649/Felix.Argyle.full.2018176.jpg",
      "https://cdn.discordapp.com/attachments/290692704755646474/317710358204907522/full_body_3_by_matthewrock-d81swlo.jpg",
      "https://cdn.discordapp.com/attachments/290692704755646474/317713240421564417/35f2f5baeebf98f20efd70f49ac884e0fe263add_hq.jpg"
    ];

    var result = Math.floor((Math.random() * sayings.length) + 0); {
      msg.channel.send(sayings[result]);
    }
  }
});
yui.on('guildMemberAdd', member => {
  let server = member.guild;
  let modLog = member.guild.channels.find('name', 'log')
  const Discord = require('discord.js');
  const embed = new Discord.RichEmbed()
    .addField(`${server.name}`, `welcome to ${server.name} ${member}!`, true)
    .setTimestamp()
    .setColor('RANDOM')
    .setFooter(`User ID: ${member.id}`)
  member.guild.defaultChannel.send({
      embed
    })

    .addField(`${server.name}`, `Member joined ${member.tag}`)
    .setTimestamp()
    .setColor('RANDOM')
    .addField('Account creation', `${dateFormat(member.createdAt)}`)
    .setFooter(`User ID: ${member.id}`)
  return member.guild.channels.get(modLog.id).send({
    embed
  })
});
yui.on("guildCreate", guild => {
  console.log(`New guild added "${guild.name}"", owned by ${guild.owner.user.username}`);
});
yui.on('message', msg => {
  if (commandIs('maths', msg)) {
    let args = msg.content.split(" ").slice(1);
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce((p, c) => p + c);
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
})
yui.on('message', msg => {
  if (msg.content === 'Deleto this') {
    msg.channel.send('http://i65.tinypic.com/smrbmc.jpg');
  }
})
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
  if (msg.content.match('/discord(.gg|app.com\/invite\/[a-z0-9]{7})/gi')) {
    msg.delete().then(m => m.reply('Please do not post Discord invites here.'))
  }
});
yui.on('message', msg => {
  var args = msg.content.split(/[ ]+/);
  if (commandIs('saydl', msg)) {
    msg.delete()
    if (hasRole(msg.member, '@everyone')) {
      if (args.length === 1) {
        msg.channel.send('You did not use it properly. Usage: `y.saydl (message you want to say)`');
      } else {
        msg.channel.send(args.join(' ').substring(7))
      }
    } else {
      msg.channel.send('You, pleb, do not have the minimum role to do this action')
    }
  }
})
yui.on('message', msg => {
  var args = msg.content.split(/[ ]+/);
  if (commandIs('nsay', msg)) {
    if (args.length === 1) {
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
  if (commandIs("flip", msg)) {
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
  if (commandIs("8ball", msg)) {
    var args = msg.content.split(/[ ]+/);
    if (args.length === 1) {
      msg.channel.send('You did not use it properly. Usage: `y.8ball do you like traps?`');
    } else {
      var sayings = ["Yes",
        "No",
        "I don't think so, goshoujin-sama",
        "Very doubtful, goshoujin-sama",
        "I am in doubt of that, goshoujin-sama",
        "I do not even know, i just want your love, goshoujin-sama"
      ];

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
  if (msg.content === 'banhammer') {
    msg.channel.send('Las ruedas del camión girando BAN.')
  }
});
yui.on('message', msg => {
  if (msg.content === 'Laura Sad') {
    msg.channel.send('http://i65.tinypic.com/2qsxjrn.png')
  }
});
yui.on('message', msg => {
  if (msg.content === 'laura sad') {
    msg.channel.send('http://i65.tinypic.com/2qsxjrn.png')
  }
});
yui.on('message', msg => {
  if (commandIs("fail", msg)) {
    msg.channel.send('He is my creator.')
  }
});
yui.on('message', msg => {
  var args = msg.content.split(/[ ]+/);
  if (commandIs("tsay", msg)) {
    if (msg.author.id !== "292883576654004235") return; {
      msg.delete();
    }
    msg.channel.send(`**Yui Team Dev's message[Yui]:** ` + '***`' + args.join(" ").substring(6) + '`***');
  }
});
yui.on('message', msg => {
  if (msg.content === "bai") {
    msg.channel.send("Adiós, onii-sama.")
  }
});
yui.on('message', msg => {
  if (msg.content === "Bai") {
    msg.channel.send("Adiós, onii-sama.")
  }
})

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}
yui.login(token)
