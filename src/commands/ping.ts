import {addCommand} from "../commands";
import {SlashCommandBuilder} from "@discordjs/builders";

const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong");

addCommand(data, () => "Pong!")
