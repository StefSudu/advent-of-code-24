import * as fs from 'node:fs/promises';


const dict : { [key: number] : [number] } = {};
const updates: number[][] = []
let middleSum = 0;

async function readFile() {
    const file =  await fs.readFile('day5/print-queue-prod.txt', 'utf-8');

    const arr = file.split('\n');

    for (let obj of arr) {
        if (obj.includes('|')) {
            const arr2 = obj.split('|');
            const key = Number(arr2[0]);
            const val = Number(arr2[1]);

            if (key in dict) {
                dict[key].push(val);
            } else {
                dict[key] = [val];
            }
        } else if (obj.includes(',')) {
            const arr3 = obj.split(',');
            const arr3Nums =  arr3.map(Number);
            updates.push(arr3Nums);
        }
    } 
}

(async () => {
    await readFile();

    for (let update of updates) {
        for (let ptr1 = 0; ptr1 < update.length-1; ptr1++) {
            let ptr2 = ptr1 + 1;

            if (update[ptr1] in dict) {
                if (dict[update[ptr1]].includes(update[ptr2])) {
                    while (dict[update[ptr1]].includes(update[ptr2])) {
                        ptr2+=1;
                    } 
                } else {
                    break;
                }
            }

            if (ptr1 == update.length - 2 && ptr2 == update.length) {
                middleSum += update[(update.length-1)/2];
            }
        }
    }

    console.log(middleSum);

})(); 