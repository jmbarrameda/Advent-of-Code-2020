/**
  Day 6: Custom Customs

  Link: https://adventofcode.com/2020/day/6

  @author Jaycee Barrameda
  @version 1.0 12/06/2020

  In my honor, I assure that I have not given nor
  received any unauthorized help in this work.

                            Jaycee Barrameda

*/
const fs = require('fs'); 

// returns an object with character count eg.( abcbcc => { a:1, b:2, c:3} )
const letterCount = (input) => {
    var obj = {}
    for(x = 0, length = input.length; x < length; x++) {
        var l = input.charAt(x)
        obj[l] = (isNaN(obj[l]) ? 1 : obj[l] + 1);
    }
    return obj;
}

fs.readFile("./input.txt", (err,data) => { 
  if(err){ 
    console.log(err)    
  } else { 
    const input = data.toString().split("\n\r").map(e=> e.trim());
    
    /* Day 6 : Part 1 starts here */
    const part1 = input.reduce( (acc, e) => {
      e = e.split(/\r\n|\r|\n/).join(""); 
      return acc + Object.keys(letterCount(e)).length //return # of letters in the object
    }, 0)
    /* Day 6 : Part 1 ends here */
    
    /* Day 6 : Part 2 starts here */
    const part2 = input.reduce( (acc, e) => {
      var row = e.split(/\r\n|\r|\n/); 
      var n_row = row.length
      var tally = letterCount(row.join(""))
      let tally_values = Object.values(tally);
      let max = Math.max(...tally_values);
      const maxCount = tally_values.filter(e => e === max) 

      /**
       * if # of rows is equal to a tally count of one alphabet, 
       * it means everyone voted for that alphabet.
       * Return alphabets with the same count as # of rows
      **/
      if(max === n_row){ return acc + maxCount.length }
      else { return acc } 
    }, 0)
    /* Day 6 : Part 2 ends here */
    
    console.log("Part1", part1)
    console.log("Part2", part2)
  } 
}) 