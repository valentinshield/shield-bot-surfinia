const Discord = require("discord.js");
const {PREFIX, OWNER} = require("../config.json");
const pageEmojis = ["🏠", "🛠", "🎉", "❔", "🔡", "🔧"];
const ReactionMenu = require('../ReactionMenu.js');
module.exports.run = (client, message, args) => {
    const msg = client.snipes.get(message.channel.id)
    const embedd = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription("<a:sharkno:837781529982664785> | Il y a rien a snipe!")
      if(!msg) return message.channel.send(embedd)
      const embed = new Discord.MessageEmbed()
      .setAuthor(msg.author.username , msg.author.displayAvatarURL({dynamic : true }))
      .setDescription(msg.content)
      .setColor("#6cc7ff")
      .setTimestamp() 
      if(msg.image)embed.setImage(msg.image)
      
      message.channel.send(embed)
  }
module.exports.help = {
    name: 'snipe',
    description: 'Savoir le ping du bot'
};