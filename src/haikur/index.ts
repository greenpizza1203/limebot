import {Hyphenator} from "./hyphenator"

const h = {pattern: [5, 7, 5]}

function getHaiku(words: string[]) {
    let totalSyllables = 0;
    let textSoFar = '';
    const lines = ['', '', ''];
    let pIndex = 0;
    for (let w = 0; w < words.length; w++) {
        const newWord = words[w];
        if (pIndex > 2) pIndex = 2;  // only 3 lines allowed
        const syllables = newWord.split(/@@|[-]/).length;
        const isLastWord = w == words.length - 1;
        // if this new word fits on this line, add it to the buffer
        if (totalSyllables + syllables < h.pattern[pIndex]) {
            textSoFar = textSoFar + ' ' + newWord;
            totalSyllables += syllables;
            // if this is the last word, flush the buffer
            if (isLastWord) {
                decodeURIComponent(textSoFar.trim())
                lines[pIndex] = textSoFar.trim();
                pIndex++;
            }
        }
        // if this new word perfectly fills out the line, add to and flush the buffer
        else if (totalSyllables + syllables == h.pattern[pIndex]) {
            textSoFar = textSoFar + ' ' + newWord;
            decodeURIComponent(textSoFar.trim())
            lines[pIndex] = textSoFar.trim();
            if (pIndex < 2) {
                textSoFar = '';
                totalSyllables = 0;
            }
            pIndex++;
        }
            // this new word needs to spill to the next line, so flush the existing buffer
        // and then start a new buffer with this new word
        else {
            decodeURIComponent(textSoFar.trim())
            lines[pIndex] = textSoFar.trim();
            textSoFar = newWord;
            totalSyllables = syllables;
            pIndex++;
            if (isLastWord) {
                decodeURIComponent(textSoFar.trim())
                lines[pIndex] = textSoFar.trim();
                pIndex++;
            }
        }
    }
    return lines;
}

export default function (word: string) {
    let broken = Hyphenator.hyphenate(word, "en");
    const words = broken.split(' ')
    let haiku = getHaiku(words);

    haiku.forEach((line, index) => {
        if (line.split(' ').join('-').split('-').length != h.pattern[index]) return undefined;
    })

    return haiku.map(line => line.split('-').join(''))
}

function decodeURIComponent(text: string) {
    // console.log(text)
}
