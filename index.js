const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('Yo boi!!'))

app.listen(port, () =>
console.log(`Your app is listening to http://localhost:${port}`)
);

const Discord = require("discord.js")
const fetch = require("node-fetch");

const client = new Discord.Client()

const config = {
    "token": (process.env.token) ,
    "prefix": "!"
}

client.login(config.token)

client.on("ready",()=>{
    console.log(`BOT ${client.user.tag} Has now been launched!! 🚀 Coded by 365 ɢᴀᴍɪɴɢ ɴ ᴍᴏʀᴇ_2.0#0002`)
    client.user.setActivity("MINIGAMES", {type:"COMPETING"})
})

client.on("message", async (message) => {
    if(!message.guild || message.author.bot || !message.content.trim().startsWith(config.prefix)) return;
    // "!ytt asda" --> "ytt asda" --> ["ytt", "asda"]
    var args = message.content.slice(config.prefix.length).trim().split(" ")
    // ["ytt", "asda"] --> cmd = "ytt" & ["asda"]
    var cmd = args.shift().toLowerCase()

    const { channel } = message.member.voice;
    if(!channel) return message.reply("You need to join a Voice Channel")

    if(cmd == "ytt" || cmd == "youtubetogether"){
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${config.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(invite =>{
            if(!invite.code) return message.reply(":x: Cannot start minigame")
            message.channel.send(`Click on the **__Link__** to start the GAME:\n> https://discord.com/invite/${invite.code}`)
        })
}})