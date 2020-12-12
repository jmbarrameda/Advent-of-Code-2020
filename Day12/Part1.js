/**
  Day 12: Rain Risk

  Link: https://adventofcode.com/2020/day/12

  @author Jaycee Barrameda
  @version 1.0 12/12/2020

  In my honor, I assure that I have not given nor
  received any unauthorized help in this work.

                            Jaycee Barrameda

*/
const fs = require('fs');

const parse = (input) => {
  const parsed = input.map( e => {
    unit = (e[0] === "R" || e[0] === "L")? e.match(/\d+/g)/90 : Number(e.match(/\d+/g))
    return { ins: e[0], unit: unit}
  })
  return parsed
}

fs.readFile("./input.txt", (err, data) => {
  if (err) {
    console.log(err)
  } else {
    const input = data.toString().split("\n").flatMap(e => e.trim());
    const p1 = parse(input)

    /* Day 12 : Part 1 starts here */
    const dirs = [ "E", "S", "W", "N" ]
    const handled = p1.reduce((acc, cur) => {
      let {ins, unit} = cur
      if(ins === "R" || ins === "L"){  
        unit *= (ins === "L") ? -1 : 1
        unit += (unit < 0) ? 4 : 0; 
        unit += dirs.indexOf(acc["facing"])
        return {...acc, facing : dirs[unit%4]}
      }
      if( ins === "F"){ ins = acc.facing }
      acc[ins] += unit
      return acc;
    }, { E:0, S:0, W:0, N:0, facing:"E" })

    const md = Math.abs(handled.N - handled.S) + Math.abs(handled.E - handled.W)
    console.log("Part1", handled, md)
    /* Day 12 : Part 1 ends here */
  }
}) 