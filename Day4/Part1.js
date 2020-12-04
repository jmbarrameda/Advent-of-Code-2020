/**
  Day 4: Passport Processing

  Link: https://adventofcode.com/2020/day/4

  @author Jaycee Barrameda
  @version 1.0 12/04/2020

  In my honor, I assure that I have not given nor
  received any unauthorized help in this work.

                            Jaycee Barrameda

*/

const fs = require('fs'); 

fs.readFile("./input.txt", (err,data) => { 
  if(err){ 
    console.log(err)    
  } else { 
    const input = data.toString().split("\n\r").map(e=>e.trim());
    
    const passport_fields = ["byr","iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

    const valid_count = input.reduce( (acc, cur, i) => {
      if( passport_fields.every( field => {return input[i].includes(field)}) ){
        return acc + 1;
      }
      else{
        return acc;
      }
    }, 0)

    console.log(valid_count)
  } 
}) 