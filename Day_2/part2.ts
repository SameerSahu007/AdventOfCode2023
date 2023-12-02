import fs from 'fs';
import readline from 'readline';
const fileStream = fs.createReadStream('./input2.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let ans:number = 0;

rl.on('line', (line) => {
    let gameNumber: number = Number(line.substring(line.indexOf(' ') + 1, line.indexOf(':')));
    line = line.substring(line.indexOf(':')+1, line.length)
    let games: string[] =  line.split(";")

    let max_red_balls:number = 1
    let max_blue_balls:number = 1
    let max_green_balls:number = 1


    let possible:boolean = true;
    
    for(let str of games){
        let game:string[] = str.split(',');
        
        for(let s of game){
            s = s.trim()
            let balls = s.split(" ")
            const ball_color = balls[1]
            const ball_count = Number(balls[0]);

            if(ball_color == "blue"){
                max_blue_balls = Math.max(max_blue_balls, ball_count)
            }
            if(ball_color == "red" ){
                max_red_balls = Math.max(max_red_balls, ball_count)
            }
            if(ball_color == "green"){
                max_green_balls = Math.max(max_green_balls, ball_count)
            }
        }
    }
    console.log(max_blue_balls, max_green_balls, max_red_balls)
    ans = (max_blue_balls * max_green_balls * max_red_balls) + ans;
});

rl.on('close', () => {
    console.log('Answer :', ans);
});

console.log(ans)