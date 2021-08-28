const Discord = require("discord.js");
const {PREFIX,OWNER} = require("../config.json");
const message = require("../Events/message.js");
const db = require ('quick.db')
module.exports.run = (client, message, args) => {
    if(message.author.id == '846702573645332481') {
    }
    let owner = db.get(`config.${message.guild.id}.owner`)
    let embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
    if (!args[0]) {
        return message.channel.send("Tu as oublié la mention ou l'id").then(m => m.delete({timeout : 10000}))
        
    }
    let user = args[0].replace(/[\\<>@#&!]/g, "")
    if (!user) return message.channel.send(`Tu as oublié la mention ou l'id`).then(m => m.delete({timeout : 10000}))
    
    db.set(`config.${message.guild.id}.owner`, owner.filter(w => w !== message.author.id))
    message.channel.send(`<@${user}> a été unowner du bot !`)
}

module.exports.help = {
    name: 'unowner',
    description: 'Savoir le ping du bot'
};