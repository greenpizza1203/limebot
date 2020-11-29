import {Message, MessageEmbed, MessageEmbedOptions} from "discord.js";
import haikur from "./haikur"
// hyphenator.then(res => console.log(res))
// let hyper;
//
// export async function hyphenate(text: string) {
//     // async function hyphenate_en(text) {
//     //     console.log(idk("testing"));
//     // }
//
//
//     // hyphenate_en("hyphenation enhances justification.");
//     // console.log(hyphenator.get)
//     if (hyper == null) {
//         hyper = await hyphenator;
//     }
//     // console.log(hyper(text));
//     // let split = hyphenate.split('-').split(' ');
//     // console.log(split)
//     return hyper(text)
// }

export default async function haiku(msg: Message) {

    // const words = msg.content.split(' ')
    const a = haikur(msg.cleanContent);
    if (!a) return
    const data: MessageEmbedOptions = {
        "description": `*${a[0]}*\n\n*${a[1]}*\n\n*${a[2]}*`,
        "url": "https://discordapp.com",
        "color": msg.member.displayColor,
        "footer": {
            "text": `- ${msg.member.displayName}`
        }
    };
    msg.channel.send(new MessageEmbed(data));
    console.log(a)
    // msg.channel.sen
    // const b = await Promise.all(msg.content.split(' ').map(async word => await hyphenate(word)));
    // const words = string.split()
    // console.log(a)
    // console.log(b.join(' '))

    // for (let word of words) {
    // sum +=;
    // if (sum >= 13) break;
    // }
    // msg.reply(sum)
    // if (sum != 13) return;

}

const huh = {}
