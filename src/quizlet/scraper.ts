import cheerio from "cheerio";
import got from "got";
import {findBestMatch} from "string-similarity";
import {parse} from "url";
import {ensureDirSync, readJSON, writeJSON} from "fs-extra"

ensureDirSync("cache")
const scaper = got.extend({
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'}
});

export function findClosest(question: string, data: any) {
    const stuff = data.flatMap(({word, definition}) => [word, definition])
    const matches = findBestMatch(question, stuff);
    return data[Math.floor(matches.bestMatchIndex / 2)]
}


export default async function scraper(question: string, results: { id: number; url: string }[]) {
    const data = []
    let allowedOthers = 1;
    for (let result of results) {
        let filePath = `cache/${result.id}.json`;
        let retrieve;
        try {
            retrieve = await readJSON(filePath)
            console.log("using " + result.id)
        } catch (e) {
            if (allowedOthers < 1) break;
            allowedOthers--;
            console.log("scraping quizlet id " + result.id)
            retrieve = await scapeHTML(result.url)
            await writeJSON(filePath, retrieve)
        }
        data.push(...retrieve)
    }
    console.log(data.length)

    // const data = await getData(urls);

    return findClosest(question, data)
}

export function getUrl(result: Result): { id: number; url: string } {
    const url = result.link;
    let parts = parse(url).pathname.split('/');
    let id = parts.find(part => (+part).toString() == part);
    if (!id) throw "unable to process quizlet url" + url;
    return {url: url, id: +id};
}

async function getData(url: string): Promise<{ definition: any; word: any }[]> {
    let parts = parse(url).pathname.split('/');
    let id = parts.find(part => (+part).toString() == part)
    if (!id) throw "unable to process quizlet url" + url
    let filePath = `cache/${id}.json`;

    try {
        return await readJSON(filePath)
    } catch (e) {
        console.log("scraping quizlet id " + id)
        const data = await scapeHTML(url)
        await writeJSON(filePath, data)
        return data;
    }
}

async function scapeHTML(url: string) {

    const html = (await scaper.get(url)).body;

    const $ = cheerio.load(html, {normalizeWhitespace: false, xmlMode: false, decodeEntities: true});
    let script = $('script').filter(function () {
            return $(this).html().startsWith('(function(){window.Quizlet["setPageData"]')
        }
    ).html()
    let start = script.indexOf("= {") + 2;
    let end = script.indexOf("QLoad") - 2;
    let json = script.substring(start, end).toString();
    const set: { [key: string]: any } = JSON.parse(json).termIdToTermsMap;
    return Object.entries(set).map(([, {word, definition}]) => ({word, definition}))
}
