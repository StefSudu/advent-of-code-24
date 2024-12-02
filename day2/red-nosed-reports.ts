import * as fs from 'node:fs/promises';

async function readFile(): Promise<number[][]> {
    const data = await fs.readFile('day2/red-nosed-reports-prod.txt', 'utf-8');
    const lines = data.split('\n');
    const result: number[][] = [];

    for (const line of lines) {
        if (line.trim() === '') {
            continue; // Skip empty lines
        }
        const nums = line.trim().split(' ').map(Number);
        result.push(nums);
    }
    return result;
}

// Function to determine if a sequence is safe
function isSequenceSafe(sequence: number[]): boolean {
    let fast = 1;
    let slow = 0;
    const direction = sequence[fast] > sequence[slow];

    while (fast < sequence.length) {
        const fastVal = sequence[fast];
        const slowVal = sequence[slow];
        const diff = Math.abs(fastVal - slowVal);
        const dir = fastVal > slowVal;

        if (diff > 3 || diff === 0 || dir !== direction) {
            return false; 
        }
        fast++;
        slow++;
    }
    return true; 
}

(async () => {
    const arr = await readFile();
    let safeReports = 0;

    for (const sequence of arr) {
        // Check if the sequence is safe without any modification
        if (isSequenceSafe(sequence)) {
            safeReports++;
            continue;
        }

        // Check if removing any single level makes the sequence safe
        let dampenedSafe = false;
        for (let j = 0; j < sequence.length; j++) {
            const modifiedSequence = [...sequence.slice(0, j), ...sequence.slice(j + 1)];
            if (isSequenceSafe(modifiedSequence)) {
                dampenedSafe = true;
                break;
            }
        }

        if (dampenedSafe) {
            safeReports++;
        }
    }

    console.log(safeReports);
})();
