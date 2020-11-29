import {Hyphenator} from "./hyphenator"

const h = {pattern: [5, 7, 5]}

function getHaiku(words: string[]) {
    let totalSyllables = 0;
    let textSoFar = '';
    const lines = ['', '', ''];
    let pIndex = 0;
    for (let w = 0; w < words.length; w++) {
        const newWord = words[w];
        if (pIndex > 2) return undefined;  // only 3 lines allowed
        const syllables = newWord.split(/@@|[-]/).length;
        const isLastWord = w == words.length - 1;
        // if this new word fits on this line, add it to the buffer

        if (totalSyllables + syllables < h.pattern[pIndex]) {
            textSoFar = textSoFar + ' ' + newWord;
            totalSyllables += syllables;
            // if this is the last word, flush the buffer
            if (isLastWord) {
                lines[pIndex] = textSoFar.trim();
                pIndex++;
            }
        } else if (totalSyllables + syllables == h.pattern[pIndex]) {
            textSoFar = textSoFar + ' ' + newWord;
            lines[pIndex] = textSoFar.trim();
            if (pIndex < 2) {
                textSoFar = '';
                totalSyllables = 0;
            } else {
                if (isLastWord) return lines
            }
            pIndex++;
        } else {
            lines[pIndex] = textSoFar.trim();
            textSoFar = newWord;
            totalSyllables = syllables;
            pIndex++;
            if (isLastWord) {
                lines[pIndex] = textSoFar.trim();
                pIndex++;
            }
        }
    }

    return undefined;
}

export default function haikur(word: string) {
    let broken = Hyphenator.hyphenate(word, "en");
    const words = broken.split(' ').map(it => it.trim())
    let haiku = getHaiku(words);
    if (!haiku) return undefined

    let notHaiku = haiku.some((line, index) => {
        let strings1 = line.split(' ').join('-').split('-');
        if (strings1.length != h.pattern[index]) return true;
    });
    if (notHaiku) return undefined;

    return haiku.map(line => line.split('-').join(''))
}

// let message = haikur("this is a word breaking test to see if it can detect line breaks across words");
// console.log(message)

