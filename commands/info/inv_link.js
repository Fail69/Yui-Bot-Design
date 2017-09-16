const commando = require('discord.js-commando');

class InvLinkCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'invlink',
      group: 'info',
      memberName: 'invlink',
      description: 'Sends my invite link'
    });
  }

  async run(msg, args) {
    msg.channel.send("You can invite me with this: https://discordapp.com/oauth2/authorize?client_id=305106002032721920&scope=bot&permissions=271772750")
  }
}

module.exports = InvLinkCommand;
