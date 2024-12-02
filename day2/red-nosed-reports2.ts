import * as fs from 'node:fs/promises';

async function readFile() {
    const data =  await fs.readFile('day2/red-nosed-reports-test.txt', 'utf-8');
    
    const lines = data.split('\n');
    const result: number[][] = [];

    for (const line of lines) {
        if (line.trim() === '') {
            continue;
        }  
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
        let currFalseLevels = 0;
        let direction = arr[i][fast]>arr[i][slow];

        while (fast < arr[i].length) {
            let fastVal = arr[i][fast];
            let slowVal = arr[i][slow];
            const diff = Math.abs(Number(fastVal)-Number(slowVal));
            const dir = fastVal > slowVal;

            if (((diff > 3) || (diff == 0)) || (dir != direction)) {
                let next = arr[i][fast+1] ? arr[i][fast+1] :  arr[i][fast];
                let prev = arr[i][slow-1] ? arr[i][slow-1] : arr[i][slow];
                let nextDir = next > slowVal;
                let prevDir = fastVal > prev;
                let diffNext = Math.abs(Number(slowVal)-Number(next));
                let diffPrev = Math.abs(Number(fastVal)-Number(prev));
                
                console.log(`${arr[i]}`);
                console.log(`Prev value: ${prev} ---- Next value: ${next} --- Slow: ${slowVal} ---- Fast: ${fastVal}`);

                if ((prevDir != direction) || (diffPrev > 3) || (diffPrev == 0)) {
                    currFalseLevels +=1;
                } 
                if ((nextDir != direction) || (diffNext > 3) || (diffNext == 0)) {
                    currFalseLevels +=1;
                } 

                if (currFalseLevels > 1) {
                    currNotSafe+=1;
                    break;
                }
            } 
            fast +=1;
            slow+=1;
        }

        console.log("next sequence");

    }
    console.log(arr.length-currNotSafe);
})();

readFile();