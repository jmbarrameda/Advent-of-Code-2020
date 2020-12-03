/**
  Day 3: Toboggan Trajectory

  Link: https://adventofcode.com/2020/day/3

  @author Jaycee Barrameda
  @version 1.0 12/03/2020

  In my honor, I assure that I have not given nor
  received any unauthorized help in this work.

                            Jaycee Barrameda

*/

const fs = require('fs'); 

const count_trees = (input) => (r_slope, d_slope) => {
    const pattern_length = input[0].length
    let step = 0;
    const trees = input.reduce( (acc, cur, i) => {
        if(i === 0){
            return acc + 0;
        }
        if(i%d_slope !== 0){
            return acc + 0;
        }
        step++;
        if(cur[(r_slope*step)%pattern_length] === '#'){
            return acc + 1;
        } else {
            return acc + 0;
        }
    }, 0)

    return trees;
}

fs.readFile("./input.txt", (err,data) => { 
  if(err){ 
    console.log(err)    
  } else { 
    const input = data.toString().split("\n").map(e=>e.trim());
    const count = count_trees(input);

    const trees1 = count(3,1)
    const trees2 = count(1,1) * count(3,1) * count(5,1) * count(7,1) * count(1,2);

    console.log("Part1", trees1)
    console.log("Part2", trees2)
  } 
}) 