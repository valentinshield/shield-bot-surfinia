const Discord = require("discord.js");
const {PREFIX} = require("../config.json");
const message = require("../Events/message.js");
const db = require ('quick.db')
module.exports.run = (client, message, args) => {
const user = message.mentions.members.first();
let gs = db.get(`config.${message.guild}.gs`)
    if(message.author.id == gs)
    if (!user) {
      return message.channel.send("*Merci de mentionner quelq'un a derank*");
    }
    if (user.id === message.author.id) {
      return message.channel.send("*Je ne peux pas vous derank parce que vous êtes l'auteur du message*");
    }
    if (user.manageable) {
        user.roles.set([]); // On supprime tous ses rôles
        message.channel.send(`${user} a éte derank`)
        let logchannel = message.guild.channels.cache.find(channel => channel.name === `📁・logs-shield`)
        const embederank = new  Discord.MessageEmbed()
        .setTitle('<:Wlbot:877901452264235009>・__Derank__')
        .setDescription(`${user} a  éte derank par ${message.author}`)
        logchannel.send(embederank)
    }
}
module.exports.help = {
    name: 'derank',
    description: 'Savoir le ping du bot'
};