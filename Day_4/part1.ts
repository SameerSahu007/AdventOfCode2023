import fs from 'fs';
import readline from 'readline';
const fileStream = fs.createReadStream('./input1.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let ans: number = 0;

rl.on('line', (line: string) => {
    let winNumber: string[] = line.substring(line.indexOf(':') + 1, line.indexOf('|') - 1).split(' ')
    let winNumberSet = new Set(winNumber.filter((item) => {
        if(item !== ''){
            return Number(item)
        }
    }))

    let myNumbers: string[] = line.substring(line.indexOf('|') + 1, line.length).split(' ')
    let myNumbersArray = myNumbers.filter((item) => {
        if(item !== ''){
            return Number(item)
        }
    })
    let point:number = 0;

    for(let num of myNumbersArray){
        // console.log(num)
        if(winNumberSet.has(num)){
            if(point === 0){
                point = 1
            }
            else{
                point *= 2;
            }
        }
    }
    ans += point;
});

rl.on('close', () => {
    console.log('Answer: ', ans)
});


