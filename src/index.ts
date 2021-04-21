import {thonkify} from "./thonkify";
import * as Discord from 'discord.js'
import {Message} from 'discord.js'
import {meme} from "./meme";
import {schoology} from "./schoology";
import {minecraft} from "./minecraft";
import {days} from "./days";
import urbandictiorary from "./urbandictionary";
import {emote} from "./emote";

const botTestChannelId = "720444800083689553";
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
const funcs: Record<string, (message: Message) => {}> = {
    thonk: thonkify,
    thonkify,
    meme,
    schoology,
    minecraft,
    days,
    emote,
    urban: urbandictiorary
}
client.on('message', async msg => {
    if (process.env.DEV && msg.channel.id !== botTestChannelId) return
    if (!process.env.DEV && msg.channel.id === botTestChannelId) return
    if (msg.author.bot) return;
    let command = msg.content.split(' ')[0].slice(1);

    if (funcs[command]) {
        await funcs[command](msg)
    } else if (msg.content === 'ping') {
        msg.reply('Pong!');
    } else if (msg.content.toLowerCase() === "f") {
        msg.guild.emojis.cache.find(emoji => emoji.name === "rip");
        msg.channel.send(`${msg.member.displayName} has paid their respects <a:rip:765555262898700288>`)
    }
});


client.login(process.env["token"])


// var job = new CronJob('0 30 7 * * *', tick, null, true);
