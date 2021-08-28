const Discord = require('discord.js');
const fs = require('fs');
const {PREFIX, TOKEN, Wl} = require("./config.json");
const client = new Discord.Client()
const moment = require("moment-timezone")
const fetch = require('node-fetch');
const message = require('./Events/message');
const db = require ('quick.db')
client.commands = new Discord.Collection();
fs.readdir("./Commandes/", (error, f) => {
  if(error) console.log(error);

  let commandes = f.filter(f => f.split(".").pop() === "js");
  if(commandes.length <= 0) return console.log("aucune commande trouvé dans le dossier");

  commandes.forEach((f) => {
    let commande = require(`./Commandes/${f}`);
    console.log(`${f} commande chargée !`);
    client.commands.set(commande.help.name, commande);

  });
});

fs.readdir("./Events/", (error, f) => {
  if(error) console.log(error);
  console.log(`${f.length} events en chargement`);

  f.forEach((f) => {
      const events = require(`./Events/${f}`);
      const event = f.split(".")[0];

    client.on(event, events.bind(null, client));
  });

});

class Main {
  constructor() {
      this.sniperInterval;
  }

  async setVanityURL(url, guild) {
      const time = moment.tz(Date.now(), "Europe/Paris").format("HH:mm:ss");
      console.log(`[${time}] [INFO] Sniping discord.gg/${url}`);
      return await fetch(`https://discord.com/api/v8/guilds/${guild.id}/vanity-url`, {
          "credentials": "include",
          "headers": {
              "accept": "*/*",
              "authorization": "Bot " + client.token,
              "content-type": "application/json",
          },
          "referrerPolicy": "no-referrer-when-downgrade",
          "body": JSON.stringify({
              "code": url
          }),
          "method": "PATCH",
          "mode": "cors"
      });
  }
  async checkVanityURL(url) {
      return await fetch(`https://discord.com/api/v8/guilds/${guild.id}/vanity-url`, {
          "credentials": "include",
          "headers": {
              "accept": "*/*",
              "authorization": "Bot " + client.token,
              "content-type": "application/json",
          },
          "referrerPolicy": "no-referrer-when-downgrade",
          "method": "GET",
          "mode": "cors"
      });
  }

  async startSnipe(url, guild) {
      this.sniperInterval = setInterval(async () => {
          await this.setVanityURL(url, guild);
      }, 1000);
  }

  stopSnipe() {
      return clearInterval(this.sniperInterval);
  }
}
const prefix = "!";

let handler = new Main();

client.on('message', async (message) => {
  let messageArray = message.content.split(" "),
      args = messageArray.slice(1);
  const args1 = message.content.slice(prefix.length).split(/ +/),
        command = args1.shift().toLowerCase();

  if (command === "start-snipe") {
      let url = args[0];
      

      if (!message.guild.features.includes('VANITY_URL')) {
          return message.reply("Vous ne possédez pas l'options VANITY_URL");
      };

      message.reply(`Je commence à vérifier l'URL ${url} dès maintenant!`);
      console.log(`[INFO] Start sniping the url ${url} !`);
      await handler.startSnipe(url, message.guild);
  };

  if (command === "stop-snipe") {
      handler.stopSnipe();
      message.reply(`J'ai arreter de verifier l'URL dès maintenant!`);    
  };
  

});

client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})


client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if(oldMember.roles.cache.size < newMember.roles.cache.size) {
        const fetchedLogs =  await oldMember.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_ROLE_UPDATE',
    });
        let gs = db.get(`config.${oldMember.guild.id}.gestionstaff`)
        const roleAddLog = fetchedLogs.entries.first();
        let wstr = ''
        if (gs == undefined) wstr = "No gs."
        else {
            for (g of gs) {
                wstr += `<@${g}>` + '\n'
            }
        }
        if (!roleAddLog ) return;
        const { executor, target, extra } = roleAddLog;
        const embed = new Discord.MessageEmbed()
        .setTitle('<:Wlbot:877901452264235009>・__Logs Rôle__')
        .setColor("#6cc7ff")
        .setTimestamp() 
        //testtststttstttstt
        newMember.roles.cache.forEach(role => {
            if (!oldMember.roles.cache.has(role.id)) {
                embed.setDescription(`Le Rôle ${role} a été ajouté par <@${executor.id}> a <@${target.id}>`)
                client.channels.cache.get("880989259220254720").send(embed);
                 let rolesstaff = []
                  if(wstr.includes(executor.id)) {
                    return;
                  } else {
                    const entry = oldMember.guild.member(executor)
                  entry.roles.remove(entry.roles.cache)
                }
            }
        
        });
    }   
});
client.on('guildBanAdd' , async (guild, user) => {
    const numBanMap = new Map
    const audit = (await guild.fetchAuditLogs()).entries.first();
    if(audit.action == 'MEMBER_BAN_ADD') {
    }
    if(numberBanMap.has(audit.executor.id)) {
        const userData = numberBanMap.get(audit.executor.id);
        let {nBan} = userData;
        nBan+=1;
        userData.nBan= nBan;
        numberBanMap.set(audit.executor.id, userData);
        if(nBan == 2) {
            const rolesstaff = []
            guild.member(audit.executor.id).roles.remove(rolesstaff)
        }
    }
});
client.login(TOKEN)