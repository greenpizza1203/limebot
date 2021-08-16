// import {thonkify} from "./commands/thonkify";
// import * as Discord from 'discord.js'
// import {Message} from 'discord.js'
// import {schoology} from "./schoology";
// import {minecraft} from "./commands/minecraft";
// import "./commands"
// import {registered} from "./commands";
//
// const client = new Discord.Client();
//
// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);
// });
// const funcs: Record<string, (message: Message) => {}> = {
//     schoology,
//     minecraft
// }
// client.on('message', async msg => {
//     if (process.env.DEV && msg.channel.id !== botTestChannelId) return
//     if (!process.env.DEV && msg.channel.id === botTestChannelId) return
//     if (msg.author.bot) return;
//     for (const {matcher, func} of registered) {
//         let match = matcher(msg.content);
//         if (match) {
//             let args = msg.content.split(' ').map(it => it.trim()).filter(it => it).slice(1);
//             let response = await func(msg, ...args);
//             if (typeof response == "string" && response.trim()) msg.reply(response.trim())
//         }
//     }
//
//     let command = msg.content.split(' ')[0].slice(1);
//
//
//     if (funcs[command]) {
//         await funcs[command](msg)
//     }
// });
//
//
// client.login(process.env["token"])
//
//
// // var job = new CronJob('0 30 7 * * *', tick, null, true);
