const Discord = require("discord.js");
const {PREFIX, OWNER} = require("../config.json");
const { oneLine, stripIndent } = require('common-tags');
const db = require ('quick.db')
const Keyv = require('keyv');
const logChannels = new Keyv(process.env.logChannels);
const client = new Discord.Client
module.exports.run = (client, message, args) => {
    const role = message.guild.roles.cache.find(r => r.name == args.slice(1).join(" "));
    const user = message.mentions.members.first();
    user.roles.add(role)
}
module.exports.help = {
    name: 'addrole',
    description: 'Savoir le ping du bot'
};