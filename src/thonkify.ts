// const gm = require('gm');
import * as gm from "gm";
import {ensureDirSync} from "fs-extra";

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


export function thonkify(text: string, outputPath: string, callback: () => void = () => {
}) {


    const image = gm();

    for (let i = 0; i < text.length; i++) {
        let letterPath = images[text.charAt(i)];
        if (!letterPath) {
            letterPath = images.nothing;
        }
        image.append(`${__dirname}/images/${letterPath}`).append(true);
    }

    return new Promise((res, rej) => {

        image.write(outputPath, function (err) {
            err ? rej(err) : res()
            // if (err) rej(err); else res()
            // console.log(arguments);
        });
    })
}

