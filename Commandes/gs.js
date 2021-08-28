const Discord = require("discord.js");
const {PREFIX, OWNER} = require("../config.json");
const message = require("../Events/message.js");
const db = require ('quick.db')
module.exports.run = (client, message, args) => {
    let owner = db.get(`config.${message.guild}.owner`)
    if(message.author.id == owner) {
    }
    let gs = db.get(`config.${message.guild.id}.gestionstaff`)
    let embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
    if (!args[0]) {
        let wstr = ''
        if (gs == undefined) wstr = "No gs."
        else {
            for (g of gs) {
                wstr += `<@${g}>` + '\n'
            }
        }
        embed.setDescription(wstr)
        embed.setTitle('__Gs List :__')
        embed.setColor('#6cc7ff')
        return message.channel.send(embed)
        
    }
    let user = args[0].replace(/[\\<>@#&!]/g, "")
    if (!user) return message.channel.send(`Tu as oublié la mention ou l'id`).then(m => m.delete({timeout : 10000}))
    
    db.push(`config.${message.guild.id}.gestionstaff`, user)
   message.channel.send(`<@${user}> est maintenant GS !`)
   let test1 = new Discord.MessageEmbed()
   .setTitle('<:Wlbot:877901452264235009>・__Logs GS__')
    .setColor("#6cc7ff")
    .setTimestamp() 
 test1.setDescription(`<@${user}> a été ajouté au GS par <@${message.author.id}>`);
 client.channels.cache.get("877593365464637440").send(test1);
}
module.exports.help = {
    name: 'gs',
    description: 'Savoir le ping du bot'
};