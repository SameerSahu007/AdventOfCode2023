import fs from 'fs';

let content: string;
function readFile() {
    content = fs.readFileSync("./input1.txt", 'utf8');
}

function extractInputs(){
    let lines = content.split("\n");
    let hands:string[] =[];
    let bid:number[] =[];

    for(let line of lines){
        console.log(line)
        hands.push(line.substring(0, line.indexOf(" ")));
        bid.push(Number(line.substring(line.indexOf(" "), line.length)));
    }

    let five_of_a_kind:string[] = []
    let four_of_a_kind:string[] = []
    let full_house:string[] = []
    let three_of_a_kind:string[] = []
    let two_pair:string[] = []
    let one_pair:string[] = []
    let high_card:string[] = []


    for(let hand of hands){
         let rank = findRank(hand);
         if(rank == 1 ){
            high_card.push(hand)
         }
         else if(rank == 2){
            one_pair.push(hand)
         }
         else if(rank == 3){
            two_pair.push(hand)
         }
         else if(rank == 4){
            three_of_a_kind.push(hand)
         }
         else if(rank == 5){
            full_house.push(hand)
         }
         else if(rank == 6){
            four_of_a_kind.push(hand)
         }
         else{
            five_of_a_kind.push(hand)
         }
    }

    sortArray(five_of_a_kind)
    sortArray(four_of_a_kind)
    sortArray(full_house)
    sortArray(three_of_a_kind)
    sortArray(two_pair)
    sortArray(one_pair)
    sortArray(high_card)

    let largerArray = [...high_card, ...one_pair, ...two_pair, ...three_of_a_kind, ...full_house, ...four_of_a_kind, ...five_of_a_kind]
    let res:number = 0;

    for(let i =0; i<largerArray.length; i++){
        res += bid[hands.indexOf(largerArray[i])]* (i + 1)
    }   
    console.log(res)

}


function sortArray(array:string[]){

    let map = new Map()
    map.set('A', 14)
    map.set('K', 13)
    map.set('Q', 12)
    map.set('J', 11)
    map.set('T', 10)
    map.set('9', 9)
    map.set('8', 8)
    map.set('7', 7)
    map.set('6', 6)
    map.set('5', 5)
    map.set('4', 4)
    map.set('3', 3)
    map.set('2', 2)
    map.set('1', 1)
    
    array.sort((a, b) => {
        let val = 0;
        for(let i =0; i<a.length; i++){
            val =  map.get(a[i]) - map.get(b[i]);
            if (val !== 0) {
              break;
            }
        }
        return val;
    });
}

function findRank(hand :string){
    let map = new Map()
    for(let char of hand){
        if(map.has(char)){
            let freq = map.get(char)
            freq++;
            map.set(char, freq)
        }
        else{
            map.set(char, 1)
        }
    }
   if(map.size === 5){
        return 1;
   }
   else if (map.size === 4){
    return 2;
   }
   else if (map.size === 3){
    for (const [key, value] of map.entries()) {
        if(value === 3){
            return 4;
        }
    }
    return 3;
   }
   else if(map.size === 2){
    for (const [key, value] of map.entries()) {
        if(value === 3){
            return 5;
        }
    }
    return 6;
   }
   return 7;
}


readFile()
extractInputs()
