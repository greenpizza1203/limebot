import axios from "axios";
import {Message} from "discord.js";

const client = axios.create({baseURL: "http://api.urbandictionary.com/v0"});

export default async function urbandictiorary(message: Message) {
    let term = message.content.substring(message.content.indexOf(" ") + 1);
    const response = await client.get("define", {params: {term}})
    message.reply(response.data.list[0].definition)
}

