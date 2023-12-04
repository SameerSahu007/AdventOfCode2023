import { match } from 'assert';
import fs from 'fs';
import readline from 'readline';
const fileStream = fs.createReadStream('./input2.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let map = new Map()
let cardNumber:number  = 1;

rl.on('line', (line: string) => {
    let winNumber: string[] = line.substring(line.indexOf(':') + 1, line.indexOf('|') - 1).split(' ')
    let winNumberArray = winNumber.filter((item) => {
        if(item !== ''){
            return Number(item)
        }
    })

    let myNumbers: string[] = line.substring(line.indexOf('|') + 1, line.length).split(' ')
    let myNumbersSet = new Set(myNumbers.filter((item) => {
        if(item !== ''){
            return Number(item)
        }
    }))

    let matches:number = 0;
    for(let num of winNumberArray){
        if(myNumbersSet.has(num)){
            matches++;
        }
    }

    if(map.has(cardNumber)){
        map.set(cardNumber, map.get(cardNumber) + 1) 
    }
    else{
        map.set(cardNumber, 1)
    }
    console.log(map)

    let instanceCount = map.get(cardNumber);
    while(instanceCount > 0){
        
        let t:number = 1;
        while(t <= matches){
            if(map.has(cardNumber + t)){
                let prev:number = map.get(cardNumber + t) + 1;
                map.set(cardNumber + t, prev)
            }
            else{
                map.set(cardNumber + t, 1)
            }
            t++;
        }
        instanceCount--;
    }

    cardNumber++;

});

rl.on('close', () => {
    let res: number = 0;
    for(let val of map.values()){
        res += val;
    }
    console.log('Answer: ', res)
});


