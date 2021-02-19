import {Message} from "discord.js";
import axios from "axios";
import Compute from "@google-cloud/compute";

const client = axios.create({
    baseURL: 'https://google-minecraft-server.herokuapp.com/'
});

const compute = new Compute({projectId: "minecraft-305223", keyFilename: "minecraft.json"});
const zone = compute.zone('us-east4-c');
const vm = zone.vm('minecraft');

export async function getVMStatus() {
    const [{status}] = await vm.getMetadata();
    return status
}

export async function startVM() {
    const result = await vm.start();
    console.log(result[0])
}

export async function stopVM() {
    const result = await vm.stop();
    console.log(result[0])
}

export async function minecraft(msg: Message) {
    const command = msg.content.split(' ');
    if (command[1] == "status") {
        const result = await getVMStatus()
        msg.reply(`The minecraft server is \`${result}\``)
    } else if (command[1] == "start") {
        startVM()
    } else if (command[1] == "stop") {
        stopVM()
    }
}


