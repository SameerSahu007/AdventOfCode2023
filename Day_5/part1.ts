import fs from 'fs';

let content: string;
function readFile() {
    content = fs.readFileSync("./input1.txt", 'utf8');
}

let seeds:string[];
let res:number = -1;
function extractInputs(){
    let seeds= content.substring(content.indexOf(':') + 1, content.indexOf('\n')).trim().split(" ").map((Number))

    let soil:number[][] = content.substring(content.indexOf("seed-to-soil map:"), content.indexOf("soil-to-fertilizer map:")).trim().split("\n").map(line => line.split(" ").map(Number))

    let fertilizer:number[][] = content.substring(content.indexOf("soil-to-fertilizer map:"), content.indexOf("fertilizer-to-water map:")).trim().split("\n").map(line => line.split(" ").map(Number))
    
    let water:number[][] = content.substring(content.indexOf("fertilizer-to-water map:"), content.indexOf("water-to-light map:")).trim().split("\n").map(line => line.split(" ").map(Number))
    
    let light:number[][] = content.substring(content.indexOf("water-to-light map:"), content.indexOf("light-to-temperature map:")).trim().split("\n").map(line => line.split(" ").map(Number))
    
    
    let temperature:number[][] = content.substring(content.indexOf("light-to-temperature map:"), content.indexOf("temperature-to-humidity map:")).trim().split("\n").map(line => line.split(" ").map(Number))

    
    let humidity:number[][] = content.substring(content.indexOf("temperature-to-humidity map:"), content.indexOf("humidity-to-location map:")).trim().split("\n").map(line => line.split(" ").map(Number))
    
    let location:number[][] = content.substring(content.indexOf("humidity-to-location map:"), content.length).trim().split("\n").map(line => line.split(" ").map(Number))
    
    let minNum:number = -1;

    for(let seed of seeds){
        let soilNumber = findMapping(soil, seed)
        let fertilizerNumber = findMapping(fertilizer, soilNumber)
        let waterNumber = findMapping(water, fertilizerNumber)
        let lightNumber = findMapping(light, waterNumber)
        let temperatureNumber = findMapping(temperature, lightNumber)
        let humidityNumber = findMapping(humidity, temperatureNumber)
        let locationNumber = findMapping(location, humidityNumber)

        if(minNum === -1 || locationNumber < minNum){
            minNum = locationNumber
        }
    }
    console.log(minNum)
}


function findMapping(array:number[][], num:number){
    for(let i = 1; i<array.length;i++){
        let destination = array[i][0];
        let source = array[i][1];
        let range = array[i][2];
        let limit = source + range;
        while(source < limit){
            if(source === num) {
                return destination
            }
            source++;
            destination++;
        }
    }
    return num;
}

readFile()
extractInputs()
