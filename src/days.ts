import {Message} from "discord.js";
import moment from "moment";

export async function days(msg: Message) {
    // const channel = await msg.channels.fetch("292745734409682944") as TextChannel
    const a = moment('05/22/2021', 'MM/DD/YYYY');
    const b = moment();
    const diff = a.diff(b, 'days')
    msg.reply(`${diff} days to graduation`)
}
