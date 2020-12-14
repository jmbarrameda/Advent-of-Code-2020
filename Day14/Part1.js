/**
  Day 14: Docking Data

  Link: https://adventofcode.com/2020/day/14

  @author Jaycee Barrameda
  @version 1.0 12/14/2020

  In my honor, I assure that I have not given nor
  received any unauthorized help in this work.

                            Jaycee Barrameda

*/
const fs = require('fs');

fs.readFile("./input.txt", (err, data) => {
  if (err) {
    console.log(err)
  } else {
    const input = data.toString().split("mask =").flatMap(e => (e === "") ? [] : e.trim().split("\r\n"));

    /* Day 14 : Part 1 starts here */
    var obj = {}
    let mask = ''
    for(let i = 0; i < input.length; i++){
      if(input[i].trim().substring(0,3) !== "mem"){
        mask = input[i].split("").reduce((acc, cur, i) => {  
          if (cur === "1" || cur === "0"){
            acc.push([cur,i])
          }
          return acc
        }, []);
      } else {
        const mem = input[i].split("=")
        const key = mem[0].match(/\d+/g)
        const val = Number(mem[1])
        let paddedVal = val.toString(2).padStart(36, 0)
        mask.forEach( (m) => {
          paddedVal = paddedVal.substring(0, m[1]) + m[0] + paddedVal.substring(m[1] + 1);
        })
        obj[key] = paddedVal
      }
    }
    const sum = Object.values(obj).reduce( (acc, cur) => acc+ parseInt( cur, 2 ),0)
    console.log("Part 1", sum)
    /* Day 14 : Part 1 ends here */
  }
}) 