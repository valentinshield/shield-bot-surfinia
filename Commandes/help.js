const Discord = require("discord.js");
const {PREFIX} = require("../config.json");
const message = require("../Events/message.js");
const db = require ('quick.db')
module.exports.run = (client, message, args) => {
    let wl = db.get(`config.${message.guild.id}.whitelist`)
    if(message.author.id == wl) {
    }   
    const embedhelp = new Discord.MessageEmbed()
    .setTitle("<:surfinia_protect:871763289481285653>・Listes des commandes du bot :")
    .setDescription(`<:surfinia_flecheblanche:872460587320365067> Mon prefix sur ce serveur est ${PREFIX}`)
    .addField('<:devbadge:872462997031886918>・__Developpeur du bot__ ',"`owner`,`unowner`")
    .addField('<:ownerbot:877901398442917909>・__Owner du bot__ ',"`wl`,`unwl`,`gs`,`ungs`,`bl`,`unbl`,`raid`,`unraid`,`unbanall`")
    .addField('<:connecte:875045463932420246>・__Gestion Staff __',"`lrm`,`derank`")
    .addField('<:Wlbot:877901452264235009>・__Whitelist du bot__',"`help`,`vc`,`alladmins`,`allbans` ,`allroles`,`snipe`,`banlist`")
    .setTimestamp()
    .setColor("#6cc7ff") 
    message.channel.send(embedhelp)
}
module.exports.help = {
    name: 'help',
    description: 'Savoir le ping du bot'
};