import {thonkify} from "./thonkify";
import * as Discord from 'discord.js'
import data from "./data.json"
import webhook from "./webhoook"
import haiku from "./haiku"
import {loadDatabase, meme} from "./meme";
import quizlet from "./quizlet";

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (process.env.DEV && msg.channel.id !== data.botTest) return
    if (!process.env.DEV && msg.channel.id === data.botTest) return
    if (msg.author.bot) return;

    if (msg.content === 'ping') {
        await msg.reply('Pong!');
    } else if (msg.content.startsWith("!thonkify ") || msg.content.startsWith("!thonk ")) {

        await thonkify(msg.content.substr(msg.content.indexOf(" ") + 1), `temp/temp.png`)
        await msg.reply("", {files: ["temp/temp.png"]})
        msg.delete()

    } else if (msg.content.toLowerCase() === "f") {
        let bongocat = msg.guild.emojis.cache.find(emoji => emoji.name === "rip");
        console.log(bongocat.toString())
        msg.channel.send(`${msg.member.displayName} has paid their respects <a:rip:765555262898700288>`)
    } else if (msg.content.startsWith("!webhook ")) {
        webhook(msg)
    } else if (msg.content.startsWith("!meme ")) {
        meme(msg)
    } else if (msg.content.startsWith("!quizlet ")) {
        quizlet(msg)
    } else {
        // haiku(msg)
    }
});

async function init() {
    await loadDatabase()
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
