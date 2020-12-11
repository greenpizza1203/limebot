declare type Query = {
    q: string
}
declare type Result = {
    position: number
    link: string
}


declare module "google-search-results-nodejs" {

    export class SerpApiSearch {
        constructor(key: string)

        json(query: Query, callback: (result: Page) => void)
    }

    export class Page {
        organic_results: Result[]

    }
}
