import {Message} from "discord.js";
import {addCommand} from "../commands";

export async function emote(msg: Message, name, url) {
    // let name = msg.content.split(' ')[1];
    url ??= msg.attachments.first()?.url;
    if (!name) {
        msg.reply("No name given for emote");
    } else if (!url) {
        msg.reply("No url or image provided")
    } else {
        msg.guild.emojis.create(url, name)
    }
}

addCommand(emote)
