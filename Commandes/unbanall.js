const Discord = require("discord.js");
const {PREFIX} = require("../config.json");
const message = require("../Events/message.js");
const db = require ('quick.db')
module.exports.run = (client, message, args) => {
    let owner = db.get(`config.${message.guild.id}.owner`)
    if (message.author.id !== owner) {
    }
        message.guild.fetchBans().then(bans => {
            if (bans.size == 0) {message.channel.send("Il n'y a aucun membre banni sur le serveur.")};
            bans.forEach(ban => {
                message.guild.members.unban(ban.user.id);
            });
        }).then(() => message.channel.send("Tous les utilisateurs bannis ont été débanni.")).catch(e => console.log(e))
    }
;

module.exports.help = {
    name: 'unbanall',
    description: 'Savoir le ping du bot'
};