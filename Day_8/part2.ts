import fs from 'fs';

let content: string;
function readFile() {
    content = fs.readFileSync("./input2.txt", 'utf8');
}

function extractInputs(){
   let lines:string[] = content.split("\n")
   let direction:string = lines[0].trim();

   let map = new Map();
   let startingPositions:string[] = [];
      for(let i = 2; i<lines.length; i++){
        let node:string =  lines[i].substring(0, lines[i].indexOf(" ")).trim()
        if(node.endsWith('A')){
            startingPositions.push(node);
        }
        let node_left:string = lines[i].substring(lines[i].indexOf('(') + 1, lines[i].indexOf(",")).trim();
        let node_right:string = lines[i].substring(lines[i].indexOf(",") + 1, lines[i].indexOf(")")).trim()
        map.set(node, [node_left, node_right])
    }

    let lcms:number[] = []
    for(let str of startingPositions){
        let count = 0;
        let i = 0;
        while(!str.endsWith("Z")){
            if(direction[i] === 'L'){
                str = map.get(str)[0];
            }
            else{
                str = map.get(str)[1];
            }
            i++;
            count++;
            if(i == direction.length) i = 0;
        }
        lcms.push(count);
    }

    let res = findLCM(lcms);
    console.log(res)


}

function gcd(a:number, b:number) : number {
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a:number, b:number) {
    return (a * b) / gcd(a, b);
}


function findLCM(lcms: number[]) {
    if (lcms.length < 2) {
        throw new Error('At least two numbers are required to find LCM.');
    }

    let result = lcms[0];
    for (let i = 1; i < lcms.length; i++) {
        result = lcm(result, lcms[i]);
    }

    return result;
}


readFile()
extractInputs()
