import random from "random";

import {scheduleJob} from "node-schedule";
import {client} from "../index";
import {TextChannel} from "discord.js";
import {channels} from "../config.json";

scheduleJob('* * 3 * *', () => {
    const temp = new Date();
    const start = temp.setHours(9);
    const end = temp.setHours(22);
    const target = new Date(random.int(start, end));
    console.log('Selfie message will be sent at ' + target);
    scheduleJob(target, () => sendMessage());

});

function sendMessage() {
    if (process.env.DEV) return;
    const channel = client.channels.cache.get(channels.nerdChat) as TextChannel;
    channel.send('<@715571596152143934> Selfie time!');
    console.log('Selfie message sent at' + new Date());
}
