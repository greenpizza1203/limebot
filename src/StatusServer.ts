import express from "express"

export class StatusServer {
    constructor(port: string | number) {
        const app = express()

        app.get('/', (req, res) => {
            res.send('Thonkify Bot is alive!')
        })

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    }

    async start() {

    }
}
