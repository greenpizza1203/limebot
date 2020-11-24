import {Message} from "discord.js";

import {Client} from "pg";

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

export function meme(msg: Message) {
    const command = msg.content.split(' ');
    if (command[1] == "alias") {
        client.query("INSERT INTO memes (name, id) " +
            `VALUES('${command[2]}','${command[3]}') ` +
            "ON CONFLICT (name) " +
            "DO UPDATE SET id = EXCLUDED.id;")
    }

}
