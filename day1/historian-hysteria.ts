import * as fs from 'node:fs/promises';

// create two list variables
const list1: number[] = [];
const list2: number[] = [];

// Read Input
const fs = require('fs');

async function readFile() {
    const data = await fs.readFile('day1/historian-hysteria-test.txt', 'utf8');
    const val = data.split('\n');
    for (let i = 0; i < val.length; i++) {
        const item = val[i];
        const itemArr = item.split('   ');
        list1.push(Number(itemArr[0]));
        list2.push(Number(itemArr[1]));
    }
}

(async () => {
    await readFile();
    console.log("List1" + list1);
    console.log("List2" + list2);
})();

// SOLUTION 1: bucket sort algorithm

// // key: unique value, value: count of occurences 
// var newList1: number[] = [];
// var newList2: number[] = [];

// // get unique values from each list
// const uniqueList1 = [...new Set(list1)];
// const uniqueList2 = [...new Set(list2)];

// // get min and max from unique lists
// const min1 = Math.min(...uniqueList1);
// const max1 = Math.max(...uniqueList1);
// const min2 = Math.min(...uniqueList2);
// const max2 = Math.max(...uniqueList2);

// // input into dictionaries

// SOLUTION 2: easy

// // sort arrays
// list1.sort();
// list2.sort();

// // total distance
// let distance = 0;

// // iterate through lists and add difference to distance variable
// for (let i = 0; i < list1.length; i++) {
//     distance += Math.abs(list1[i] - list2[i]);
// }

// console.log(distance);

