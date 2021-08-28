const Discord = require("discord.js");
const {PREFIX,OWNER} = require("../config.json");
const message = require("../Events/message.js");
const db = require ('quick.db')
module.exports.run = (client, message, args) => {
    let owner = db.get(`config.${message.guild.id}.owner`)
    if (message.author.id !== owner) {
    }
    let gs = db.get(`config.${message.guild.id}.gs`)
    if (message.author.id !== OWNER) return message.channel.send('You can\'t do this').then(m => m.delete({timeout : 10000}))
    let embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
    if (!args[0]) {
        return message.channel.send("Tu as oublié la mention ou l'id").then(m => m.delete({timeout : 10000}))
        
    }
    let user = args[0].replace(/[\\<>@#&!]/g, "")
    if (!user) return message.channel.send(`Tu as oublié la mention ou l'id`).then(m => m.delete({timeout : 10000}))
    
    db.set(`config.${message.guild.id}.gs`, gs.filter(w => w !== message.author.id))
    message.channel.send(`<@${user}> a été ungs du bot !`)
    let test2 = new Discord.MessageEmbed()
    .setTitle('<:Wlbot:877901452264235009>・__Logs GS__')
     .setColor("#6cc7ff")
     .setTimestamp() 
  test2.setDescription(`<@${user}> a été enlevé de la gs par <@${message.author.id}>`);
  client.channels.cache.get("877593365464637440").send(test2);

}

module.exports.help = {
    name: 'ungs',
    description: 'Savoir le ping du bot'
};