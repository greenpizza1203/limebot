//@ts-ignore
import {Page, SerpApiSearch} from "google-search-results-nodejs";

const api = new SerpApiSearch("fe68d706a01dcb6804e5081d28982113d18c7e208b78c681fa66a699c884c06a")

function json(string: string): Promise<Page> {
    let query = {
        q: `site:quizlet.com ${string}`
    };
    return new Promise(resolve => api.json(query, resolve))
}


export async function search(query: string) {
    const data = await json(query)
    return data.organic_results
}
