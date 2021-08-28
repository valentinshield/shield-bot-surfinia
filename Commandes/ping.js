const Discord = require("discord.js");
const {PREFIX} = require("../config.json");
const { oneLine, stripIndent } = require('common-tags');
const db = require ('quick.db')
const client = new Discord.Client
module.exports.run = (client, message, args) => {
message.reply(`<:surfinia_protect:871763289481285653> **${Date.now() - message.createdTimestamp} ms.**`);
}   
module.exports.help = {
    name: 'ping',
    description: 'Savoir le ping du bot'
};