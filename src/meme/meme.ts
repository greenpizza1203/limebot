import {Message} from "discord.js";

import {Client} from "pg";
import axios from "axios";

const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:chicken@localhost:5432/temp',
    ssl: process.env.DATABASE_URL ? {
        rejectUnauthorized: false
    } : false
});

export async function loadDatabase() {
    client.connect();
    await client.query('CREATE TABLE IF NOT EXISTS memes(' +
        'name varchar(50) NOT NULL,' +
        'id varchar(200) NOT NULL,' +
        'PRIMARY KEY (name)' +
        ')');
}

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

export async function meme(msg: Message) {
    const command = msg.content.split(' ');
    if (command[1] == "alias") {
        try {
            await client.query("INSERT INTO memes (name, id) " +
                `VALUES('${command[2]}','${command[3]}') ` +
                "ON CONFLICT (name) " +
                "DO UPDATE SET id = EXCLUDED.id;");
            msg.reply(`aliased ${command[2]} to ${command[3]}`)
        } catch (e) {
            msg.reply(`Alias error`)
        }
    } else {
        const boxes = getBoxes(msg.content)
        let s = `SELECT * FROM memes WHERE Name = '${command[1]}';`;
        const {rows: [row]} = await client.query(s)
        let id = row?.id ?? command[1];
        const memeUrl = await getMeme(id, boxes)
        if (memeUrl) msg.reply({files: [memeUrl]})
    }

}
