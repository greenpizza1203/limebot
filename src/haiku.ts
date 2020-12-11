import {Message, MessageEmbed, MessageEmbedOptions} from "discord.js";
import haikur from "./haikur"


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

}
