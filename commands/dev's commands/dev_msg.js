const commando = require('discord.js-commando');

class DevMsgCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'devmsg',
      group: "dev's commands",
      memberName: 'devmsg',
      description: 'Only Devs can use it',
    });
  }

  async run(msg, args) {
    var args = msg.content.split(/[ ]+/);
    if (msg.author.id !== "ID_here_uwu") return; {
      msg.delete();
    }
    msg.channel.send("", {
      embed: {
        color: 6385317,
        author: {
          name: msg.author.username + " [Something uwu]",
          icon_url: msg.author.avatarURL
        },
        title: "Yui Team Dev",
        description: args.join(" ").substring(8),
        timestamp: new Date(),
        footer: {
          icon_url: msg.author.avatarURL
        }
      }
    })
  }
}

module.exports = DevMsgCommand;
