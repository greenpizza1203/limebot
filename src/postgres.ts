import {Client} from "pg";

export class Postgres {
    client

    constructor() {
        this.client = new Client({
            connectionString: process.env.DATABASE_URL || 'postgresql://postgres:chicken@localhost:5432/temp',
            ssl: process.env.DATABASE_URL ? {
                rejectUnauthorized: false
            } : false
        });
    }

    async init() {
        this.client.connect();
        await this.client.query('CREATE TABLE IF NOT EXISTS memes(' +
            'name varchar(50) NOT NULL,' +
            'id varchar(200) NOT NULL,' +
            'PRIMARY KEY (name)' +
            ')');
    }

    async query(query) {
        return this.client.query(query)
    }
}
