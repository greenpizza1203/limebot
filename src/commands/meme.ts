import {Message} from "discord.js";
import axios from "axios";
import {Postgres} from "../postgres";
import {addCommand} from "../commands";

let postgres = new Postgres();

const def = {"boxes[0][text]": " "}

export function getBoxes(content: string): { [p: string]: string } {
    let chunk = content.substring("!meme ".length);
    let number = chunk.indexOf(" ");
    if (number == -1) return def
    const params: { [boxIndex: string]: string } = {};
    let chunks = chunk.substring(number + 1).split(';');
    if (chunks.length == 0) return def
    chunks.forEach((string, index) => params[`boxes[${index}][text]`] = string)
    return params
}

export async function getMeme(template_id: string, boxes: { [p: string]: string }) {
    let params = {
        template_id,
        username: "greenpizza12",
        password: "chicken",
        ...boxes
    };
    let response = await axios.post("https://api.imgflip.com/caption_image", null, {params});

    return response?.data?.data?.url
}

export async function list() {
    const result = await postgres.query("SELECT * FROM memes")
    if (result?.rows) {
        let map = result.rows.map(({name, id}) => name + " " + id);
        let finalString = map.join('\n');
        return ("\nAlias list\n" + finalString)
    }
}

export async function alias(key, value) {
    try {
        await postgres.query("INSERT INTO memes (name, id) " +
            `VALUES('${key}','${value}') ` +
            "ON CONFLICT (name) " +
            "DO UPDATE SET id = EXCLUDED.id;");
        return `aliased ${key} to ${value}`
    } catch (e) {
        return "Alias error"
    }
}

export async function make(msg, name) {
    const boxes = getBoxes(msg.content)
    let s = `SELECT * FROM memes WHERE Name = '${name}';`;
    const {rows: [row]} = await postgres.query(s)
    let id = row?.id ?? name;
    const memeUrl = await getMeme(id, boxes)
    if (memeUrl) msg.reply({files: [memeUrl]})
}

export async function meme(msg: Message, ...command) {
    if (command[0] == "list") {
        return list();
    } else if (command[0] == "alias") {
        return alias(command[1], command[2]);
    } else {
        make(msg, command[0]);
    }
}

addCommand(meme)

