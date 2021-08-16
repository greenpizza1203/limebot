import {Message} from "discord.js";
import fse from "fs";

let dir = __dirname + '/commands/';

type Command = (msg: Message, ...args: string[]) => void | string | Promise<string | void>;

export function addCommand(prefix: string | string[] | ((string) => boolean) | Command, func?: Command) {

    let matcher = prefix;
    if (!func) {
        matcher = it => it.startsWith("!" + (prefix as Command).name);
        func = prefix as Command;
    }
    if (Array.isArray(prefix)) {
        matcher = prefix.includes.bind(prefix)
    } else if (typeof prefix == "string") {
        matcher = it => it.startsWith(prefix)
    }
    registered.push({matcher, func})

}

export const registered = []
fse.readdirSync(dir).forEach(filename => {
    require(dir + filename)
});


