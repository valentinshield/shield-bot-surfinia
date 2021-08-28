const Discord = require("discord.js");
const {PREFIX} = require("../config.json");
const db = require ('quick.db')
const ReactionMenu = require('../ReactionMenu.js');
module.exports.run = (client, message, args) => {
  let gs = db.get(`config.${message.guild.id}.gs`)
  if(message.author.id == gs) {
  }
    const adminRole =  message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
    if (!adminRole) {
    return message.channel.send("Veuillez mentionnez un rôle.")
    }
    const admins = message.guild.members.cache.filter(m => {
    
      if (m.roles.cache.find(r => r === adminRole)) return true;
    }).sort((a, b) => (a.joinedAt > b.joinedAt) ? 1 : -1).array();
    const embed = new Discord.MessageEmbed()
      .setTitle(`List des Membres [${admins.length}]`)
      .addField('Total', `**${admins.length}**`)
      .setTimestamp()
      .setColor('#6cc7ff');
    
    const interval = 25;
    if (admins.length === 0) message.channel.send(embed.setDescription('No roles found.'));
    else if (admins.length <= interval) {
      message.channel.send(embed
        .setTitle(`Liste des membres ayant le rôle ${adminRole}`)
        .setDescription(admins.join('\n'))
      );

    // Reaction Menu
    } else {

      embed
        .setTitle('Rôle List')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(
          'Expires after two minutes.\n' + message.member.displayName,  
          message.author.displayAvatarURL({ dynamic: true })
        );

      new ReactionMenu(message.client, message.channel, message.member, embed, admins, interval);
    }
  }

;


module.exports.help = {
    name: 'lrm',
    description: 'Savoir le ping du bot'
};