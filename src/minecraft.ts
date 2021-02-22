import {Message, MessageEmbed} from "discord.js";
import Compute from "@google-cloud/compute";

import util from "minecraft-server-util";

import {v4} from "public-ip";
import express from "express";
import {client} from "./index";

const compute = new Compute({projectId: "minecraft-305223", keyFilename: "minecraft.json"});
const zone = compute.zone('us-east4-c');
const vm = zone.vm('minecraft');
let cacheIP;
const {MessageAttachment} = require('discord.js');
const firewall = compute.firewall('heroku')


v4().then(setWhiteListIP)

export async function setWhiteListIP(ip) {
    if (process.env.DEV) return
    await firewall.setMetadata({"sourceRanges": [ip]})
    console.log("Firewall updated to " + ip)
}


export async function getIP() {
    // noinspection JSPotentiallyInvalidTargetOfIndexedPropertyAccess
    return cacheIP ??= (await vm.getMetadata())[0].networkInterfaces[0].accessConfigs[0].natIP
}

export async function getVMStatus() {
    const [{status}] = await vm.getMetadata();

    return status
}

export async function getMinecraftStatus() {
    let data;
    try {
        data = await util.status(await getIP())
    } catch (e) {
        console.error(e)
    }
    return {embed: getEmbed(data)}

}

let lastIndex = 0;

async function getLogs() {
    let [log, {next}] = await vm.getSerialPortOutput(1, {start: lastIndex});
    const lines = log.split('\n');
    let actualLines = []
    for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i];
        next -= line.length + 1;
        if (line.indexOf("java") != -1) {
            actualLines.push(line.split(' ').slice(0, 3).join(' ') + line.split(":")[6])
        }
        if (actualLines.length >= 10) break;
    }
    lastIndex = next;
    return "```" + actualLines.join('\n') + "```"

}

function getEmbed(data) {
    // console.log(data)
    const embed = new MessageEmbed()
    embed.setTitle("Minecraft Server Status")
    embed.setColor("#00ff00")
    embed.setTimestamp()
    embed.setDescription("Server is currently offline")
    if (data) {
        embed.setDescription(`Server is currently online with ${data.onlinePlayers} players`)
        embed.addField("description", data.description.descriptionText)
        embed.addField("version", data.version)
        let players = data.samplePlayers?.map(player => player.name)?.join('\n');
        if (players) embed.addField("players", players)
        embed.setFooter(data.host)
    }
    let actualBuf = data.favicon.split(',')[1];
    const imageStream = Buffer.from(actualBuf, 'base64');
    const attachment = new MessageAttachment(imageStream, "favicon.png");
    embed.attachFiles(attachment)
    embed.setThumbnail("attachment://favicon.png");
    return embed
}


export async function getStatus() {
    const status = await getVMStatus()
    if (status.toUpperCase() !== "RUNNING") return `The minecraft VM is \`${status}\``
    return await getMinecraftStatus()
}

export async function minecraft(msg: Message) {
    const command = msg.content.split(' ');
    if (command[1] == "status") {
        msg.reply(await getStatus())
    } else if (command[1] == "start") {
        await vm.start()
    } else if (command[1] == "stop") {
        await vm.stop();
    } else if (command[1] == "logs") {
        msg.reply(await getLogs())

    }
}
