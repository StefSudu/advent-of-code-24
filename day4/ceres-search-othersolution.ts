import * as fs from 'node:fs/promises';

async function readFile(): Promise<string[]> {
    const file = await fs.readFile('day4/ceres-search-prod.txt', 'utf-8');
    const data = file.split('\n');

    return data;
}

(async () => {
    const data = await readFile();

    let ret = 0;
    let chk = (y: number,x: number,dy: number,dx: number)=>{
      if (y+3*dy>=0 && y+3*dy<data.length && data[y+dy][x+dx] == "M" && data[y+2*dy][x+2*dx] == "A" && data[y+3*dy][x+3*dx] == "S") ret++;}
    
    for (let y=0;y<data.length;y++) {
      for (let x=0;x<data[y].length;x++) {
        if (data[y][x] == "X") {
          chk(y,x,-1,-1);
          chk(y,x,-1,0);
          chk(y,x,-1,1);
          chk(y,x,0,-1);
          chk(y,x,0,1);
          chk(y,x,1,-1);
          chk(y,x,1,0);
          chk(y,x,1,1);
        }
      }
    }
    console.log(ret);
})();
