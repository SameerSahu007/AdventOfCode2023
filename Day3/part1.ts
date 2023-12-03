import fs from 'fs';
import readline from 'readline';
const fileStream = fs.createReadStream('./input1.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let ans: number = 0;
let inputArray: Array<Array<string>> = [];

rl.on('line', (line: string) => {
    let lineChar:Array<string> = line.split('')
    lineChar.push('.');
    inputArray.push(lineChar);
});

rl.on('close', () => {
    checkAdjacent(inputArray)
    console.log('Answer :', ans);
});

function isCharNumber(c:string) {
    return c >= '0' && c <= '9';
}

function checkAdjacent(inputArray: Array<Array<string>>) {

    let r:number = inputArray.length
    let c:number = inputArray[0].length
    
    for (let i = 0; i < r; i++) {
        
        for (let j = 0; j < c; j++) {
            
            let currentNum: string = ""
            let includeNumber: boolean = false;

            while(isCharNumber(inputArray[i][j])){
                currentNum = currentNum + inputArray[i][j]

                if(i - 1  >= 0 && !isCharNumber(inputArray[i-1][j]) && inputArray[i-1][j] !== '.'){
                    includeNumber = true;
                }

                else if(i - 1  >= 0 && j - 1 >= 0 && !isCharNumber(inputArray[i-1][j-1]) && inputArray[i-1][j-1] !== '.'){
                    includeNumber = true
                }

                else if(j - 1 >= 0 && !isCharNumber(inputArray[i][j -1]) && inputArray[i][j -1] !== '.'){
                    includeNumber = true;
                }

                else if(j - 1 >= 0 && i+1 < r && !isCharNumber(inputArray[i+1][j -1]) && inputArray[i+1][j -1] !== '.'){
                    includeNumber = true;
                }

                else if(i+1 < r && !isCharNumber(inputArray[i+1][j]) && inputArray[i+1][j] !== '.'){
                    includeNumber = true;
                }

                else if(i + 1 < r && j + 1 < c && !isCharNumber(inputArray[i+1][j+1]) && inputArray[i+1][j+1] !== '.'){
                    includeNumber = true
                }

                else if(j + 1 < c && !isCharNumber(inputArray[i][j+1]) && inputArray[i][j+1] !== '.'){
                    includeNumber = true
                }
                
                else if(i-1 >= 0 && j + 1 < c && !isCharNumber(inputArray[i - 1][j+1]) && inputArray[i-1][j+1] !== '.'){
                    includeNumber = true
                }
                j++;
            }
            if(includeNumber){
                ans += Number(currentNum)
            }
        }
    }
}

