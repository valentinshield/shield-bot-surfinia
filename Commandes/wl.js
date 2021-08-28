const Discord = require("discord.js");
const {PREFIX, OWNER} = require("../config.json");
const message = require("../Events/message.js");
const db = require ('quick.db')
module.exports.run = (client, message, args) => {
    let owner = db.get(`config.${message.guild}.owner`)
    if(message.author.id == owner) {
    }
    let wl = db.get(`config.${message.guild.id}.wl`)
    let embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
    if (!args[0]) {
        let wstr = ''
        if (wl == undefined) wstr = "No gs."
        else {
            for (w of wl) {
                wstr += `<@${w}>` + '\n'
            }
        }
        embed.setDescription(wstr)
        embed.setTitle('__Wl List :__')
        embed.setColor('#6cc7ff')
        return message.channel.send(embed)
        
    }
    let user = args[0].replace(/[\\<>@#&!]/g, "")
    if (!user) return message.channel.send(`Tu as oublié la mention ou l'id`).then(m => m.delete({timeout : 10000}))
    
    db.push(`config.${message.guild.id}.wl`, user)
   message.channel.send(`<@${user}> est maintenant wl !`)
   let test = new Discord.MessageEmbed()
   .setTitle('<:Wlbot:877901452264235009>・__Logs Wl__')
    .setColor("#6cc7ff")
    .setTimestamp() 
 test.setDescription(`<@${user}> a été ajouté a la wl par <@${message.author.id}>`);
 client.channels.cache.get("877593365464637440").send(test);
}
module.exports.help = {
    name: 'wl',
    description: 'Savoir le ping du bot'
};