import {Message} from "discord.js";

export async function emote(msg: Message) {
    let name = msg.content.split(' ')[1];
    let url = msg.content.split(' ')[2];
    if (!name) {
        msg.reply("No name given for emote");
    } else if (!url) {
        msg.reply("No url provided")
    } else {
        msg.guild.emojis.create(url, name)
    }


}
