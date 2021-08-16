import {Client, Intents} from "discord.js";
import {executeCommand, loadCommands} from "./commands";

import {channels} from "./config.json"

export const client = new Client({intents: [Intents.FLAGS.GUILDS]});


client.once('ready', async () => {
    await loadCommands();
    console.log('Ready!');
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    if (process.env.DEV && interaction.channel.id !== channels.botTestLocal) return
    if (!process.env.DEV && interaction.channel.id === channels.botTestLocal) return
    await executeCommand(interaction);
});
client.login(process.env.token);
