import fs from 'fs';
import readline from 'readline';
const fileStream = fs.createReadStream('./input2.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const map = new Map();
map.set('one', 1);
map.set('two', 2);
map.set('three', 3);
map.set('four', 4);
map.set('five', 5);
map.set('six', 6);
map.set('seven', 7);
map.set('eight', 8);
map.set('nine', 9);

for (let i = 1; i <= 9; i++) {
    const key = String(i);
    map.set(key, i);
}

let ans:number = 0;

rl.on('line', (line :string) => {
    let foundNumbers: Array<[number, number]> = [];
    map.forEach((value, key) => {
       if(line.includes(key)){
           foundNumbers.push([line.indexOf(key), value])
           let lastIndex = line.lastIndexOf(key)
           if(lastIndex !== -1 && lastIndex !== line.indexOf(key) ){
            foundNumbers.push([lastIndex, value])
           }
       }
    })

    foundNumbers.sort(function(a ,b)  {
        return a[0] - b[0];
    });

    const firstNumber:number = foundNumbers[0][1];
    const lastNumber:number = foundNumbers[foundNumbers.length -1][1];
    const num = (firstNumber*10 )+ lastNumber;
    ans = ans + num;

});


rl.on('close', () => {
    console.log("Answer ", ans);
});
