import axios from "axios";
import {Message} from "discord.js";
import {addCommand} from "../commands";

const client = axios.create({baseURL: "https://api.urbandictionary.com/v0"});

async function urban(message: Message, term) {
    const response = await client.get("define", {params: {term}})
    message.reply(response.data.list[0].definition)
}

addCommand(urban)
