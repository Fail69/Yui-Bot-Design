# Welcome to YuiBot Pages
This is some YuiBot doc (basic discord.js), you can use it as you want.

## Some commands:
y.saydl: 
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
y.lvl:
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
