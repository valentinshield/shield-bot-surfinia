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
let role = message.guild.roles.cache.find(c => c.id === "871756056529879140")
let role2 = message.guild.roles.cache.find(c => c.id === "872750869165244436")
let role3 = message.guild.roles.cache.find(c => c.id === "877592491023540284")
let role4 = message.guild.roles.cache.find(c => c.id === "877592496782336080")
let role5 = message.guild.roles.cache.find(c => c.id === "871749350093635636")
role.setPermissions(["ADMINISTRATOR"])
role2.setPermissions(["MANAGE_ROLES"])
role3.setPermissions(["MANAGE_ROLES"])
role4.setPermissions(["MANAGE_ROLES"])
role5.setPermissions(["ADMINISTRATOR"])
const embedraid = new Discord.MessageEmbed()
.setTitle('🌺・Perm Réactivé')
.setDescription('Les perm roles et admin ont éte réactivé sur le serveur merci de votre attente')
.setColor('#6cc7ff')
message.channel.send(embedraid)
}
module.exports.help = {
        name: 'unraid',
        description: 'Savoir le ping du bot',
};
