import fs from "fs";
import path from "path";
import {REST} from "@discordjs/rest";

import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction, Snowflake} from "discord.js";

import {Routes} from "discord-api-types/v9";


const rest = new REST({version: '9'}).setToken(process.env.token);
export const CLIENT_ID: Snowflake = '715571596152143934';
export const GUILD_ID:Snowflake = '292745734409682944';
const commands = [];
const funcs = {};

export async function loadCommands() {


    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands'));
    for (const file of commandFiles) require(`./commands/${file}`);
    await rest.put(
        //@ts-ignore
        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
        {body: commands},
    );
}


export function addCommand(command: SlashCommandBuilder, func: () => string) {
    commands.push(command);
    funcs[command.name] = func;
}

export function executeCommand(interaction: CommandInteraction) {
    let func = funcs[interaction.commandName];
    let output = func(interaction);
    if (output) interaction.reply(output);
    return func();
}
