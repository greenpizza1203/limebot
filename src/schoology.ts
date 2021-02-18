import axios from "axios";
import addOAuthInterceptor from "axios-oauth-1.0a";
import {Message} from "discord.js";
import moment from "moment";

// Create a client whose requests will be signed
const client = axios.create();

// Add interceptor that signs requests
addOAuthInterceptor(client, {
    // OAuth consumer key and secret
    key: "15f0231ecbb0d242e39438219812ef6f060073296",
    secret: "55ae1c0636236559e92e71dbafdd8735",

    // HMAC-SHA1 and HMAC-SHA256 are supported
    algorithm: "HMAC-SHA1",
});

export async function schoology(message: Message) {
    const [section, assignment] = message.content.substring("!schoology ".length).split(' ');
    const response = await client.get(`https://api.schoology.com/v1/sections/${section}/assignments/${assignment}`)
    const body = await response.data
    const printData = {
        "Title:  ": body.title,
        "Points: ": body.max_points,
        "Due:    ": moment(body.due).calendar()
    }
    let total = "\n"
    // let biggest = 0
    // Object.keys(printData).forEach(value => biggest = Math.max(value.length, biggest))
    // console.log(biggest)
    Object.entries(printData).map(([key, value]) => total += `${key} ${value}\n`)
    console.log(total)
    message.reply(total)


}
//
// // @ts-ignore
// schoology({
//     content: "!schoology 2920066394 4698303838", reply: () => {
//     }
// })
