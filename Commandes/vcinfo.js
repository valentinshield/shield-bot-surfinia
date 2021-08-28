const Discord = require("discord.js");
const {PREFIX} = require("../config.json");
const message = require("../Events/message.js");
module.exports.run = (client, message, args) => {
    const members = message.guild.members.cache;
    const embedvc = new Discord.MessageEmbed()
    .addField('**<:surfinia_protect:871763289481285653>・Surfinia Protect**', [
        `__Membres__: ${message.guild.memberCount} <:surfinia_invites:872459719850217483>`,
        `__Connectés__: ${members.filter(member => member.presence.status !== 'offline').size} <:connecte:875045463932420246>`,
        `__Vocal__: ${message.guild.members.cache.filter(m => m.voice.channel).size} <:vocal:875046047750160455>`,
        `__Stream__: ${message.guild.members.cache.filter(m => m.voice.streaming).size} <:stream:875045593121165422>`,
        `__Mute Micro__: ${message.guild.members.cache.filter(m => m.voice.selfMute).size} <:nomic:875045745647034368>`,
        `__Cam__: ${message.guild.members.cache.filter(m => m.voice.selfVideo).size} <:cam:877890437199851620>`,
        `__Boost__: ${message.guild.premiumSubscriptionCount || '0'} <a:boost:875045651996639302>`,
    ])
    message.channel.send(embedvc)
}


module.exports.help = {
    name: 'vc',
    description: 'Savoir le ping du bot'
};