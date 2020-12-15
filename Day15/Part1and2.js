/**
  Day 15: 

  Link: https://adventofcode.com/2020/day/15

  @author Jaycee Barrameda
  @version 1.0 12/15/2020

  In my honor, I assure that I have not given nor
  received any unauthorized help in this work.

                            Jaycee Barrameda

*/
const fs = require('fs');

const part1 = (input, target = 2020) => {
  const p1 = input.reduce((map, num, i) => map.set(num, i + 1), new Map());

  let num = 0; 
  let last_turn;
  for(let turn = input.length + 1; turn < target; turn++){
    last_turn = p1.get(num) || 0;
    p1.set(num, turn);
    num = last_turn && turn - last_turn
  }

  return num;
};

const part2 = (input) => {
  return part1(input, 30000000);
}

fs.readFile("./input.txt", (err, data) => {
  if (err) {
    console.log(err)
  } else {
    const input = data.toString().split(",").flatMap(e => Number(e));
    
    /* Day 15 : Part 1 starts here */
    console.log("Part1", part1(input))
    /* Day 15 : Part 1 ends here */

    /* Day 15 : Part 2 starts here */
    console.log("Part2", part2(input))
    /* Day 15 : Part 2 ends here */
  }
}) 