import {Message} from "discord.js";
import axios from "axios";
import {Postgres} from "./postgres";

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


export async function meme(msg: Message) {
    console.log('huh')
    const command = msg.content.split(' ');
    if (command[1] == "list") {
        const result = await postgres.query("SELECT * FROM memes")
        if (result?.rows?.length) {
            let map = result.rows.map(({name, id}) => name + " " + id);
            let finalString = map.join('\n');
            msg.reply("\nAlias list\n" + finalString)
        }
    } else if (command[1] == "alias") {
        try {
            await postgres.query("INSERT INTO memes (name, id) " +
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
        const {rows: [row]} = await postgres.query(s)
        let id = row?.id ?? command[1];
        const memeUrl = await getMeme(id, boxes)
        if (memeUrl) msg.reply({files: [memeUrl]})
    }
}


