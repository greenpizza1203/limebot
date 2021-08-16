import {Client} from "pg";

export class Postgres {
    client

    constructor() {
        this.client = new Promise(async (res) => {
            const client = new Client({
                connectionString: process.env.DATABASE_URL || 'postgresql://postgres:chicken@localhost:5432/temp',
                ssl: process.env.DATABASE_URL ? {
                    rejectUnauthorized: false
                } : false
            });
            await client.connect();
            await client.query('CREATE TABLE IF NOT EXISTS memes(' +
                'name varchar(50) NOT NULL,' +
                'id varchar(200) NOT NULL,' +
                'PRIMARY KEY (name)' +
                ')');
            res(client)
        })
    }


    async query(query) {
        return (await this.client).query(query)
    }
}
