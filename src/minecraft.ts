import {Message} from "discord.js";
import axios from "axios";

const client = axios.create({
    baseURL: 'https://google-minecraft-server.herokuapp.com/'
});

export async function minecraft(msg: Message) {
    const command = msg.content.split(' ');
    if (command[1] == "status") {
        const result = await client.get("status")
        msg.reply(result.data)

    }
}


// @ts-ignore
minecraft({content: "!minecraft status", reply: console.log})
