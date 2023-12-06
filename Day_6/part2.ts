import fs from 'fs';

let content: string;
function readFile() {
    content = fs.readFileSync("./input2.txt", 'utf8');
}

function extractInputs() {
    let lines: string[] = content.split('\n');
    let time = Number(lines[0].substring(lines[0].indexOf(":") + 1).replace(/\s+/g, ""));
    let distance = Number(lines[1].substring(lines[1].indexOf(":") + 1).replace(/\s+/g, ""));
    let ways = 0;
    for (let j = 1; j <= time; j++) {
        if (((time - j) * j) > distance)
            ways++;
    }

    console.log(ways)
}


readFile()
extractInputs()
