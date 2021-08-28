const Discord = require("discord.js");
const {PREFIX, OWNER} = require("../config.json");
const { oneLine, stripIndent } = require('common-tags');
const db = require ('quick.db')
const Keyv = require('keyv');
const logChannels = new Keyv(process.env.logChannels);
const client = new Discord.Client
module.exports.run = (client, message, args) => {
  let wl = db.get(`config.${message.guild}.whitelist`)
  if(message.author.id == wl) {
  }
  var str_filtrer = message.guild.members.cache.filter(member => member.hasPermission("ADMINISTRATOR") && !member.user.bot)
  var str_map = str_filtrer.map(m => `<@${m.user.id}>`).join("\n")
//   message.channel.send(`Liste des membres ayant les permissions \`BAN_MEMBERS\` (**${str_filtrer.size}**)`)
  for(let i = 0; i < str_map.length; i += 1995) {
    const str_content = str_map.substring(i, Math.min(str_map.length, i + 1995));
    const adminperm = new Discord.MessageEmbed()
      .addField(`__Liste des membres ayant les permissions \`ADMINISTRATOR\`__ !\n`, `${str_content}`, `__Total__ : ${str_filtrer.size}`, true)
      .setFooter(`Total: ${str_filtrer.size}・Surfinia Protect`)
      .setColor("#6cc7ff")
    message.channel.send({embed: adminperm}) 
    //   message.channel.send(`\`\`\`json\n${str_content}\`\`\``);
  }
};
module.exports.help = {
    name: 'alladmins',
    description: 'Savoir le ping du bot'
};