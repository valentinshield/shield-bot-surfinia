const Discord = require("discord.js");
const {PREFIX,OWNER} = require("../config.json");
const message = require("../Events/message.js");
const db = require ('quick.db')
module.exports.run = (client, message, args) => {
    let owner = db.get(`config.${message.guild.id}.owner`)
    if (message.author.id !== owner) {
        let user = client.users.fetch(args[0]);
        if(!user) return message.channel.send(`Mention ou Id invalide`);
      
        let fetched = db.get(`blacklist_${user.id}`)
        if(!fetched) {
          return message.channel.send(`Cette utlisateur n'est pas blacklist`);
        }else{
          db.delete(`blacklist_${user.id}`)
          message.channel.send(`${user.id} a bien éte unblacklist!`)
        }
      }else{
        return message.channel.send(`Tu peux pas faire ca`)
      }
      
}
module.exports.help = {
    name: 'unbl',
    description: 'Savoir le ping du bot'
};