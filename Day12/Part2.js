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

function arrayRotate(arr, reverse) {
  if (reverse) arr.push(arr.shift()) ;
  else arr.unshift(arr.pop());
  return arr;
}

fs.readFile("./input.txt", (err, data) => {
  if (err) {
    console.log(err)
  } else {
    const input = data.toString().split("\n").flatMap(e => e.trim());
    const p1 = parse(input)
    
    /* Day 12 : Part 2 starts here */
    const dirs = [ "E", "S", "W", "N" ]
    const p2 = parse(input)
    const handled2 = p2.reduce((acc, cur) => {
      let {ins, unit} = cur
      if(ins === "R" || ins === "L"){  
        let d_clone = [...dirs]
        for(let i = 0; i < unit; i++){
          if(ins === "R"){
            //swap values to the right
            [acc[d_clone[0]], acc[d_clone[1]], acc[d_clone[2]], acc[d_clone[3]]] = [acc[d_clone[3]], acc[d_clone[0]], acc[d_clone[1]], acc[d_clone[2]]];
            d_clone = arrayRotate(d_clone)
          }else if(ins === "L"){ 
            //swap values to the left
            [acc[d_clone[0]], acc[d_clone[1]], acc[d_clone[2]], acc[d_clone[3]]] = [acc[d_clone[1]], acc[d_clone[2]], acc[d_clone[3]], acc[d_clone[0]]];
            d_clone = arrayRotate(d_clone, true)
          }
        }
        return acc
      }
      
      if( ins === "F"){ 
        acc["SS"] += acc["S"]*unit
        acc["SN"] += acc["N"]*unit
        acc["SW"] += acc["W"]*unit
        acc["SE"] += acc["E"]*unit 
      } else {
        acc[ins] += unit
      }
    
      return acc;
    }, { E:10, S:0, W:0, N:1, SE:0, SS:0, SN:0, SW:0 })

    const md2 = Math.abs(handled2.SN - handled2.SS) + Math.abs(handled2.SE - handled2.SW)
    console.log("Part2", md2)
    /* Day 12 : Part 2 ends here */
  }
}) 