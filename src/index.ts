import {thonkify} from "./thonkify";
import * as Discord from 'discord.js'
import {meme} from "./meme";
import {schoology} from "./schoology";
import {minecraft} from "./minecraft";
import {Message} from "discord.js";

const botTestChannelId = "720444800083689553";
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
const funcs:Record<string, (message:Message) => {}> = {
    thonkify,
    meme,
    schoology,
    minecraft
}

client.on('message', async msg => {
    if (process.env.DEV && msg.channel.id !== botTestChannelId) return
    if (!process.env.DEV && msg.channel.id === botTestChannelId) return
    if (msg.author.bot) return;

    if (msg.content === 'ping') {
        await msg.reply('Pong!');
    } else if (msg.content.startsWith("!thonkify ") || msg.content.startsWith("!thonk ")) {

    thonkify(msg)

    } else if (msg.content.toLowerCase() === "f") {
        let bongocat = msg.guild.emojis.cache.find(emoji => emoji.name === "rip");
        console.log(bongocat.toString())
        msg.channel.send(`${msg.member.displayName} has paid their respects <a:rip:765555262898700288>`)
    } else if (msg.content.startsWith("!meme ")) {
        meme(msg)
    } else if (msg.content.startsWith("!schoology ")) {
        schoology(msg)
    } else if (msg.content.startsWith("!minecraft ")) {
minecraft(msg)
    }
});

async function init() {
    // await initPosgres()
    // meme({
    //     content: "!meme list", reply: () => {
    //     }
    // })
    client.login(process.env["token"]);
}

init()

// import haiku from "./haiku";
//
// // @ts-ignore
// haiku({
//     content: "the eclipse is night tomorrow the moon conceals shadow over us",
//     // @ts-ignore
//     reply: text => {
//         console.log(text)
//     }
// })
