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
    }
    if (msg.content.startsWith("!thonkify ") || msg.content.startsWith("!thonk ")) {

        await thonkify(msg.content.substr(msg.content.indexOf(" ") + 1), `temp/temp.png`)
        msg.channel.send("", {files: ["temp/temp.png"]})

    }
});

client.login(process.env["token"]);
