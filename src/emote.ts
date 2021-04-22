import {Message} from "discord.js";

export async function emote(msg: Message) {
    let name = msg.content.split(' ')[1];
    console.log(msg.attachments)
    let url = msg.content.split(' ')[2] || msg.attachments.first()?.url;
    if (!name) {
        msg.reply("No name given for emote");
    } else if (!url) {
        msg.reply("No url or image provided")
    } else {
        msg.guild.emojis.create(url, name)
    }
}
