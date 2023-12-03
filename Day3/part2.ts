import fs from 'fs';
import readline from 'readline';
const fileStream = fs.createReadStream('./input2.txt');

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

function extractAdjacent(visited: number[][], i: number, j: number, inputArray: Array<Array<string>>): string {
    let num: string = "";
    let t: number = j;
    
    while (t >= 0 && isCharNumber(inputArray[i][t]) && !visited[i][t]) {
        num = inputArray[i][t] + num;
        visited[i][t] = 1;
        t--;
    }

    j++;

    while (j < inputArray[0].length && isCharNumber(inputArray[i][j]) && !visited[i][j]) {
        num = num + inputArray[i][j];
        visited[i][j] = 1;
        j++;
    }

    return num;
}


function checkAdjacent(inputArray: Array<Array<string>>) {

    let r:number = inputArray.length
    let c:number = inputArray[0].length

    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            
            let adjacentNums: Array<number> = []
            if(inputArray[i][j] === '*'){

                const visited: number[][] = Array.from({ length: r }, () =>
                Array.from({ length: c }, () => 0) as number[]);
                let nums:number = 0;

                if(i - 1  >= 0 && isCharNumber(inputArray[i-1][j])){
                    nums = Number(extractAdjacent(visited,i-1,j, inputArray))
                    if(nums)
                    adjacentNums.push(nums)
                }

                if(i - 1  >= 0 && j - 1 >= 0 && isCharNumber(inputArray[i-1][j-1])){
                    nums = Number(extractAdjacent(visited,i-1,j-1, inputArray))
                    if(nums)
                    adjacentNums.push(nums)
                }

                if(j - 1 >= 0 && isCharNumber(inputArray[i][j-1])){
                    nums = Number(extractAdjacent(visited,i,j-1, inputArray))
                    if(nums)
                    adjacentNums.push(nums)
                }

                if(j - 1 >= 0 && i+1 < r && isCharNumber(inputArray[i+1][j -1]) ){
                    nums = Number(extractAdjacent(visited,i+1,j-1, inputArray))
                    if(nums)
                    adjacentNums.push(nums)
                }
                //

                if(i+1 < r && isCharNumber(inputArray[i+1][j])){
                    nums = Number(extractAdjacent(visited,i+1,j, inputArray))
                    if(nums)
                    adjacentNums.push(nums)

                }

                if(i + 1 < r && j + 1 < c && isCharNumber(inputArray[i+1][j+1])){
                    nums = Number(extractAdjacent(visited,i+1,j+1, inputArray))
                    if(nums)
                    adjacentNums.push(nums)
                }

                if(j + 1 < c && isCharNumber(inputArray[i][j+1])){
                    nums = Number(extractAdjacent(visited,i,j+1, inputArray))
                    if(nums)
                    adjacentNums.push(nums)
                }
                
                if(i-1 >= 0 && j + 1 < c && isCharNumber(inputArray[i - 1][j+1])){
                    nums = Number(extractAdjacent(visited,i-1,j+1, inputArray))
                    if(nums)
                    adjacentNums.push(nums)
                }

                if(adjacentNums.length == 2){
                    console.log(adjacentNums)
                    ans += adjacentNums[0] * adjacentNums[1];
                }
            }

        }
    }
}

