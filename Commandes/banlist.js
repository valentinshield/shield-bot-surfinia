const Discord = require("discord.js");
const talkedRecently = new Set();
const {PREFIX, OWNER} = require("../config.json");
const { oneLine, stripIndent } = require('common-tags');
const db = require ('quick.db')
const Keyv = require('keyv');
const logChannels = new Keyv(process.env.logChannels);
const client = new Discord.Client
exports.run = async(client, message, args) => {
  let wl = db.get(`config.${message.guild}.whitelist`)
if(message.author.id == wl) {
} 
const bans = new Map();
            message.guild.fetchBans().then(g => {
                bans[g.id] = g;
                let banlist = (`${bans[g.id].map(ge => `\n ${ge.user.tag} : <@${ge.user.id}>`).join('\n')}`)
                        try {     
                let noembed = new Discord.MessageEmbed()
  .setColor("#6cc7ff")
                .setDescription(`Il n'y a aucun utilisateur bannis sur ce serveur.`)
                .setAuthor(`Membre banni sur ${message.guild.name}`)
               .setFooter('Utilisateur utilisant cette commande ' + message.author.tag, message.author.avatarURL())
                if(banlist.length === 0) return message.channel.send(noembed)
                const embed = new Discord.MessageEmbed()
                    .setDescription(banlist)
                    .setAuthor(`Membre banni sur ${message.guild.name}`)
                .setColor("#6cc7ff")
                message.channel.send(embed)
                      } catch (err) {
        const embed = new Discord.MessageEmbed()
            .addField(`Banni sur le serveur`, `Désolé, mais votre serveur comporte trop d'utilisateurs bannis. Je ne peux donc pas l'afficher. Discord ne le permet pas.`)
            .setColor("#6cc7ff")
            .setTimestamp()
        message.channel.send(embed)
                      }

        });
    }
                                           
module.exports.help = {
  name: 'banlist',
  description: 'Affiche les membres bannis du serveur où est utilisé la commande.',
};