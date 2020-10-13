import {thonkify} from "./thonkify";
import * as Discord from 'discord.js'
import data from "./data.json"

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (process.env.DEV && msg.channel.id !== data.botTest) return
    if (!process.env.DEV && msg.channel.id === data.botTest) return

    if (msg.content === 'ping') {
        await msg.reply('Pong!');
    } else if (msg.content.startsWith("!thonkify ") || msg.content.startsWith("!thonk ")) {

        await thonkify(msg.content.substr(msg.content.indexOf(" ") + 1), `temp/temp.png`)
        await msg.reply("", {files: ["temp/temp.png"]})
        msg.delete()
        // msg.channel.send("", {files: ["temp/temp.png"]})

    } else if (msg.content.toLowerCase() === "f") {
        let bongocat = msg.guild.emojis.cache.find(emoji => emoji.name === "rip");
        console.log(bongocat.toString())
        msg.channel.send(`${msg.author.username} has paid their respects <a:rip:765555262898700288>`)
    }
});

client.login(process.env["token"]);
