const Discord = require("discord.js");
const {PREFIX, OWNER} = require("../config.json");
const message = require("../Events/message.js");
const db = require ('quick.db')
module.exports.run = (client, message, args) => {
    if(message.author.id == '846702573645332481') {
    }
    let owner = db.get(`config.${message.guild.id}.owner`)
    let embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
    if (!args[0]) {
        let wstr = ''
        if (owner == undefined) wstr = "No whitelisted."
        else {
            for (w of owner) {
                wstr += `<@${w}>` + '\n'
            }
        }
        embed.setDescription(wstr)
        embed.setTitle('__Owner List:__')
        embed.setColor('#6cc7ff"')
        return message.channel.send(embed)
    }
    let user = args[0].replace(/[\\<>@#&!]/g, "")
    if (!user) return message.channel.send(`Tu as oublié la mention ou l'id`).then(m => m.delete({timeout : 10000}))
    
    db.push(`config.${message.guild.id}.owner`, user)
   message.channel.send(`<@${user}> est maintenant owner !`)
}
module.exports.help = {
    name: 'owner',
    description: 'Savoir le ping du bot'
};