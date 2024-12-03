import * as fs from 'node:fs/promises';

async function readFile(): Promise<string>  {
    const data = await fs.readFile('day3/mull-it-over-prod.txt', 'utf-8');
    return data;
};

function sum(number1: number, number2: number): number {
    return number1*number2;
}

(async() => {
    // get data back from file
    const data = await readFile();

    // get array of all matches
    const arr = data.match(/mul\(\d{1,3},\d{1,3}\)/g) as never;

    const regex = /mul\((\d+),(\d+)\)/g;
    const matches = [];
    let match;

    while ((match = regex.exec(arr)) !== null) {
        matches.push([parseInt(match[1], 10), parseInt(match[2], 10)]);
    }


    let finalSum = 0;

    for (const args of matches) {
        finalSum+=sum(args[0], args[1]);
    }

    console.log(finalSum);

})();
