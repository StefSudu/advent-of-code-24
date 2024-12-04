import * as fs from 'node:fs/promises';

async function readFile(): Promise<string[]> {
    const file = await fs.readFile('day4/ceres-search-prod.txt', 'utf-8');
    const data = file.split('\n');

    return data;
}

(async () => {
    const data = await readFile();

    var count = 0;
    for (let y = 0; y < data.length; y++) {
        const line = data[y];
        for (let x = 0; x < line.length; x++) {
            const letter = line[x];

            if (letter === 'X' || letter === 'S') {
                let right = '';
                let down = '';
                let diagRight = '';
                let diagLeft = '';
                let left = '';
                let up = '';
                let backDiagRight = '';
                let backDiagLeft = '';

                // Forward Sequences (Right, Down, Diagonal)
                if (letter === 'X') {
                    // Right
                    if (x + 3 < line.length) {
                        right = line[x] + line[x + 1] + line[x + 2] + line[x + 3];
                        if (right === 'XMAS') count++;
                    }

                    // Down
                    if (y + 3 < data.length) {
                        down = data[y][x] + data[y + 1][x] + data[y + 2][x] + data[y + 3][x];
                        if (down === 'XMAS') count++;
                    }

                    // Diagonal Right
                    if (y + 3 < data.length && x + 3 < line.length) {
                        diagRight = data[y][x] + data[y + 1][x + 1] + data[y + 2][x + 2] + data[y + 3][x + 3];
                        if (diagRight === 'XMAS') count++;
                    }

                    // Diagonal Left
                    if (y - 3 >= 0 && x - 3 >= 0) {
                        diagLeft = data[y][x] + data[y - 1][x - 1] + data[y - 2][x - 2] + data[y - 3][x - 3];
                        if (diagLeft === 'XMAS') count++;
                    }
                }

                // Backward Sequences (Left, Up, Diagonal)
                if (letter === 'S') {
                    // Left
                    if (x - 3 >= 0) {
                        left = line[x] + line[x - 1] + line[x - 2] + line[x - 3];
                        if (left === 'SAMX') count++;
                    }

                    // Up
                    if (y - 3 >= 0) {
                        up = data[y][x] + data[y - 1][x] + data[y - 2][x] + data[y - 3][x];
                        if (up === 'SAMX') count++;
                    }

                    // Diagonal Backward Right (Up-Right)
                    if (y - 3 >= 0 && x + 3 < line.length) {
                        backDiagRight = data[y][x] + data[y - 1][x + 1] + data[y - 2][x + 2] + data[y - 3][x + 3];
                        if (backDiagRight === 'SAMX') count++;
                    }

                    // Diagonal Backward Left (Up-Left)
                    if (y - 3 >= 0 && x - 3 >= 0) {
                        backDiagLeft = data[y][x] + data[y - 1][x - 1] + data[y - 2][x - 2] + data[y - 3][x - 3];
                        if (backDiagLeft === 'SAMX') count++;
                    }
                }
            }
        }
    }

    console.log(`Total Count: ${count}`);
})();
