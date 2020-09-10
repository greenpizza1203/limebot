import {thonkify} from "./thonkify";

// thonkify("test", `temp/temp.png`)
import * as Discord from 'discord.js'

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (msg.content === 'ping') {
        await msg.reply('Pong!');
    }
    if (msg.content.startsWith("!thonkify ") || msg.content.startsWith("!thonk ")) {

        await thonkify(msg.content.substr(msg.content.indexOf(" ") + 1), `temp/temp.png`)
        msg.channel.send("", {files: ["temp/temp.png"]})

    }
});

client.login('NzE1NTcxNTk2MTUyMTQzOTM0.Xs_J-w.d6kN_S3XK9jWCjrfSTSdDOjHXSk');
