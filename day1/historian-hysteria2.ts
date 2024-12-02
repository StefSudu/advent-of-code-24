import * as fs from 'node:fs/promises';

// create set  and dictionary for list1
const list1Dict: {[key: number] : number} = {};
// create two list variables
const list2Dict: {[key: number] : number} = {};


// Read Input
async function readFile() {
    const data = await fs.readFile('day1/historian-hysteria-prod.txt', 'utf8');
    const val = data.split('\n');
    for (let i = 0; i < val.length; i++) {
        const item = val[i];
        const itemArr = item.split('   ').map(Number);
        
        // count occurrences, in a dictionary, for list 2
        if (itemArr[1] in list2Dict) {
            list2Dict[itemArr[1]] += 1;
        } else {
            list2Dict[itemArr[1]] = 1;
        } 
        
        // count occurrences, in a dictionary, for list 1
        if (itemArr[0] in list1Dict) {
            list1Dict[itemArr[0]] += 1;
        } else {
            list1Dict[itemArr[0]] = 1;
        } 
    }
}

(async () => {
    await readFile();

    let result = 0;

    // Solution: O(n)
    
    // loop through unique set 
    for (const key in list1Dict) {
        let currRes = 0;
        const occurencesIn1 = list1Dict[key];

        if (key in list2Dict) {
            const occurencesIn2 = list2Dict[key];

            currRes += (Number(key) * occurencesIn2)*occurencesIn1;
        }
        result+=currRes;
    }

    console.log(result);

})();

