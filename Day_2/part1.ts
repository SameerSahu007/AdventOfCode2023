import fs from 'fs';
import readline from 'readline';
const fileStream = fs.createReadStream('./input1.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let ans:number = 0;



rl.on('line', (line) => {
    let gameNumber: number = Number(line.substring(line.indexOf(' ') + 1, line.indexOf(':')));
    line = line.substring(line.indexOf(':')+1, line.length)
    let games: string[] =  line.split(";")

    const max_red_balls:number = 12
    const max_blue_balls:number = 14
    const max_green_balls:number = 13


    let possible:boolean = true;
    
    for(let str of games){
        let game:string[] = str.split(',');
        
        for(let s of game){
            s = s.trim()
            let balls = s.split(" ")
            const ball_color = balls[1]
            const ball_count = Number(balls[0]);

            if(ball_color == "blue" && ball_count >  max_blue_balls){
                possible = false;
                break;
            }
            if(ball_color == "red" && ball_count >  max_red_balls){
                possible = false;
                break;
            }
            if(ball_color == "green" && ball_count >  max_green_balls){
                possible = false;
                break;
            }
        }
    }
    if(possible){
        ans = ans + gameNumber;
    }
});

rl.on('close', () => {
    console.log('Answer :', ans);
});

console.log(ans)