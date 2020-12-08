/**
  Day 8: Handheld Halting

  Link: https://adventofcode.com/2020/day/8

  @author Jaycee Barrameda
  @version 1.0 12/08/2020

  In my honor, I assure that I have not given nor
  received any unauthorized help in this work.

                            Jaycee Barrameda

*/
const fs = require('fs');

const parse = (input) => {
  const parsed = input.map( e => {
    const instruction = e.split(" ");
    return { op : instruction[0], arg: Number(instruction[1]), step: 0}
  })
  return parsed
}

const checkInstructions = (input) => {
  const instructions = JSON.parse(JSON.stringify(input))
  
  let t_acc = 0;
  let t_terminated = false;
  for(let i = 0, j = 1; instructions[i].step === 0; i++, j++){
    const {op, arg} = instructions[i]

    instructions[i].step = j;
    if( op === "acc"){ t_acc += arg }
    if(i === instructions.length-1){ t_terminated = true; break; }
    if( op === "jmp"){ i += arg - 1 }      
  }
  return { acc: t_acc, terminated: t_terminated}
}

fs.readFile("./input.txt", (err, data) => {
  if (err) {
    console.log(err)
  } else {
    const input = data.toString().split("\n").flatMap(e => e.trim());
    const instructions = parse(input)

    /* Day 7 : Part 1 starts here */
    const part1 = checkInstructions(instructions)
    console.log("Part1", part1)
    /* Day 7 : Part 1 ends here */

    /* Day 7 : Part 2 starts here */
    for(let i = 0; i < instructions.length; i++){
      const ins_temp = JSON.parse(JSON.stringify(instructions))
      const { op } = ins_temp[i]

      if(op === "nop"){
        ins_temp[i].op = "jmp"
      } else if (op === "jmp") {
        ins_temp[i].op = "nop"
      } else { continue; }

      const result = checkInstructions(ins_temp)
      if (result.terminated) {
        console.log("Part2", result)
        break;
      }
    }
    /* Day 7 : Part 2 ends here */
  }
}) 