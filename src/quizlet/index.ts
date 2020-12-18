import {search} from "./search";
import scraper, {getUrl} from "./scraper";
import {Message} from "discord.js";


export default async function quizlet(msg: Message) {
    const query = msg.content.substring("!quizlet ".length)
    let results = await search(query);
    const urls = results.map(result => getUrl(result))

    const card = await scraper(query, urls)
    // console.log(card)
    msg.channel.send(`${card.word}\n\n${card.definition}`)
}

// magic("How will automatic stabilizers affect the economy during a recession")
