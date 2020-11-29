import {Message} from "discord.js";
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
    let sum = 0
    const a = haikur(msg.cleanContent);
    console.log(a)
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
