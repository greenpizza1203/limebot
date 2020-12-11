import {search} from "./search";
import scraper from "./scraper";
import {Message} from "discord.js";


export default async function quizlet(msg: Message) {
    const query = msg.content.substring("!quizlet ".length)
    console.log(query)
    const url = (await search(query))[0].link
    const card = await scraper(query, url)
    // console.log(card)
    msg.channel.send(`${card.word}\n\n${card.definition}`)
}

// magic("How will automatic stabilizers affect the economy during a recession")
