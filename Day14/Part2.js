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

    /* Day 14 : Part 2 starts here */
    var obj = {}
    let mask = ''  //contains X and index
    let mask1 = [] //contains 1 and index
    for(let i = 0; i < input.length; i++){
      if(input[i].trim().substring(0,3) !== "mem"){
        /* check bit mask and index */
        mask1 = []
        mask = input[i].split("").reduce((acc, cur, i) => {  
          if(cur === "1"){ mask1.push([cur,i])}
          if (cur === "X"){ acc.push([cur,i]) }
          return acc
        }, []);
      } else {
        const mem = input[i].split("=")
        const address = Number(mem[0].match(/\d+/g)[0])
        const val = Number(mem[1])
        let paddedAdr = address.toString(2).padStart(36, 0)

        mask1.forEach( (m) => {
          paddedAdr = paddedAdr.substring(0, m[1]) + m[0] + paddedAdr.substring(m[1] + 1); // sad cuz string immutable but need to modify
        })

        const len = 2**mask.length;
        for(let i = 0; i < len; i++){
          let x = i.toString(2).padStart(mask.length, 0 )
          mask.forEach( (m, i) => {
            paddedAdr = paddedAdr.substring(0, m[1]) + x[i] + paddedAdr.substring(m[1] + 1);
          })
          key = paddedAdr
          obj[key] = val
        }
      }
    }
    const sum = Object.values(obj).reduce( (acc, cur) => acc+cur,0)
    console.log("Part 2", sum)
    /* Day 14 : Part 2 ends here */
  }
}) 