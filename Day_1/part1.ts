import fs from 'fs';
import readline from 'readline';
const fileStream = fs.createReadStream('./input1.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let ans:number = 0;

rl.on('line', (line) => {
    let l:string = "";
    let r:string = "";
    const ln:number = line.length

    for(let i = 0; i<ln; i++){
        if(line[i] >= '0' && line[i] <= '9'){
            l = line[i];
            break;
        }
    }

    for(let i = ln-1; i>=0; i--){
        if(line[i] >= '0' && line[i] <= '9'){
            r = line[i];
            break;
        }
    }
    ans = ans + Number(l+r)
});

rl.on('close', () => {
    console.log('Answer :', ans);
});

console.log(ans)