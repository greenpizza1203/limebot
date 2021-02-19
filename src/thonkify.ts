import gm from "gm";
import {ensureDirSync} from "fs-extra";
import {Message} from "discord.js";

ensureDirSync(`temp`)
const images = {
    nothing: "nothing.png"
};
for (let i = 0; i < 26; i++) {
    const low = String.fromCharCode('a'.charCodeAt(0) + i);
    images[low] = `low/${low}.png`;
    const cap = String.fromCharCode('A'.charCodeAt(0) + i);
    images[cap] = `cap/${cap}.png`
}


export async function thonkify(msg: Message) {

    const text = msg.content.substr(msg.content.indexOf(" ") + 1)
    const outputPath = `temp/temp.png`;


    const image = gm();

    for (let i = 0; i < text.length; i++) {
        let letterPath = images[text.charAt(i)];
        if (!letterPath) {
            letterPath = images.nothing;
        }
        image.append(`${__dirname}/../images/${letterPath}`).append(true);

        if (i != text.length - 1) image.append(`${__dirname}/../images/gap.png`).append(true);
    }

    // return new Promise<void>((res, rej) => {
    image.write(outputPath, async err => {
        if (err) return;
        await msg.reply("", {files: ["temp/temp.png"]})
        msg.delete()
    })
}

