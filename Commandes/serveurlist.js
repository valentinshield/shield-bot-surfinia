const Discord = require("discord.js");
const {PREFIX, OWNER} = require("../config.json");
const pageEmojis = ["🏠", "🛠", "🎉", "❔", "🔡", "🔧"];
const ReactionMenu = require('../ReactionMenu.js');
module.exports.run = (client, message, args) => {
  let owner = db.get(`config.${message.guild.id}.owner`)
  if (message.author.id !== owner) {
  }
    const servers = message.client.guilds.cache.array().map(guild => {
        return `\`${guild.id}\` - **${guild.name}** - \`${guild.members.cache.size}\` members`;
      });
  
      const embed = new Discord.MessageEmbed()
        .setTitle('Server List')
        .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("#6cc7ff");
  
      if (servers.length <= 10) {
        const range = (servers.length == 1) ? '[1]' : `[1 - ${servers.length}]`;
        message.channel.send(embed.setTitle(`Server List ${range}`).setDescription(servers.join('\n')));
      } else {
        new ReactionMenu(message.client, message.channel, message.member, embed, servers);
      }
    }
;

module.exports.help = {
    name: 'serveurlist',
    description: 'Savoir le ping du bot'
};