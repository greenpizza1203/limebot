import {thonkify} from "./thonkify";
import * as Discord from 'discord.js'
import {Message, TextChannel} from 'discord.js'
import {meme} from "./meme";
import {schoology} from "./schoology";
import {minecraft} from "./minecraft";
import moment from "moment";
import {CronJob} from "cron"

const botTestChannelId = "720444800083689553";
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
const funcs: Record<string, (message: Message) => {}> = {
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


client.login(process.env["token"]).then(tick);

async function tick() {
    const channel = await client.channels.fetch("292745734409682944") as TextChannel
    const a = moment('05/22/2021', 'MM/DD/YYYY');
    const b = moment();
    const diff = a.diff(b, 'days')
    channel.send(`${diff} days to graduation`)
}

var job = new CronJob('0 30 7 * * *', tick, null, true);
