import {Message} from "discord.js";

export async function ping(msg: Message) {
    msg.reply("Pong")
}
