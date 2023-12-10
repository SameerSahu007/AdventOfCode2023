import fs from 'fs';

let content: string;
function readFile() {
    content = fs.readFileSync("./input1.txt", 'utf8');
}

function extractInputs(){
   let lines:string[] = content.split("\n")
   let direction:string = lines[0].trim();

   let map = new Map();
   for(let i = 2; i<lines.length; i++){
        let node:string =  lines[i].substring(0, lines[i].indexOf(" ")).trim();
        let node_left:string = lines[i].substring(lines[i].indexOf('(') + 1, lines[i].indexOf(",")).trim();
        let node_right:string = lines[i].substring(lines[i].indexOf(",") + 1, lines[i].indexOf(")")).trim()
        map.set(node, [node_left, node_right])
   }

   let startingPoint:string = "AAA";
   let i = 0, count = 0;
   while(startingPoint !== "ZZZ"){
    if(direction[i] === 'R'){
        startingPoint = map.get(startingPoint)[1];
    }
    else{
        startingPoint = map.get(startingPoint)[0];
    }
    i++, count++;
    if(i === direction.length){
        i = 0;
    }
   }
   console.log(count);
}


readFile()
extractInputs()
