import express from "express";
import Discord from "discord.js";

const app = express()
const client = new Discord.Client();
client.login(process.env["token"]);

client.on('ready', () => {

    app.get("/", async (req, res) => {
        if (!userData) userData = await fillUserData()
        res.send(userData)
    })
    app.listen(process.env.PORT || 8080)
    const users = [
        {id: "461710458907394060", minecraft: "greenpizza12"},
        {id: "592812587796791306", minecraft: "fluffysheep3"},
        {id: "397459673206489088", minecraft: "Rahulko8"},
        {id: "241642919700856833", minecraft: "zhouke"},
        {id: "241403175951794176", minecraft: "_Confucius"},
        {id: "241406235654619140", minecraft: "AScrubLord"},
    ]

    let userData;

    async function fillUserData() {
        const final = {};
        for (const user of users) {
            const userData = await client.users.fetch(user.id)
            final[user.minecraft] = {username: userData.username, avatarURL: userData.displayAvatarURL()}
        }
        return final

    }

});
