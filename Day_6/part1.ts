import fs from 'fs';

let content: string;
function readFile() {
    content = fs.readFileSync("./input1.txt", 'utf8');
}

function extractInputs(){
    let lines:string[] = content.split('\n');
    let time = lines[0].substring(lines[0].indexOf(":")).match(/\d+/g)!.map((Number))
    let distance  = lines[1].substring(lines[0].indexOf(":")).match(/\d+/g)!.map((Number))
    let res:number = 1;

    for(let i = 0; i<time.length; i++){
        let ways = 0;
        for(let j = 1; j <= time[i]; j++){
            if(((time[i] - j) * j) > distance[i])
            ways++;
        }
        if(ways !== 0){
            res *= ways;
        }
        console.log(ways)
    }
    console.log(res)
}


readFile()
extractInputs()
