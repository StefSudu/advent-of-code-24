import { read } from 'node:fs';
import * as fs from 'node:fs/promises';

async function readFile() {
    const data =  await fs.readFile('day2/red-nosed-reports-prod.txt', 'utf-8');
    
    const lines = data.split('\n');
    const result: number[][] = [];

    for (const line of lines) {
        if (line.trim() === '') continue; 
        const nums = line.trim().split(' ').map(Number);
        result.push(nums);
    }
    return result;
}

(async() => {
    const arr = await readFile();
    let currNotSafe = 0
    for (let i=0;i< arr.length; i++) {
        let fast = 1;
        let slow = 0;
        let direction = arr[i][fast]>arr[i][slow];

        while (fast < arr[i].length) {
            let fastVal = arr[i][fast];
            let slowVal = arr[i][slow];
            const diff = Math.abs(Number(fastVal)-Number(slowVal));
            const dir = fastVal > slowVal;

            if (((diff < 1) || (diff > 3) || (diff == 0)) || (dir != direction)) {
                currNotSafe += 1
                break;
            } 

            fast +=1;
            slow+=1;
        }

    }
    console.log(arr.length-currNotSafe);
})();

readFile();