/**
  Day 11: Seating System

  Link: https://adventofcode.com/2020/day/11

  @author Jaycee Barrameda
  @version 1.0 12/11/2020

  In my honor, I assure that I have not given nor
  received any unauthorized help in this work.

                            Jaycee Barrameda

*/
const fs = require('fs');

let total_ocount = 0;
const getAdjacent = (input, n = 1) => {
  let parsed = {}  
  total_ocount = 0;
  let colLength = input[0].length;
  let rowLength = input.length;

  for(let row = 0; row < rowLength; row++){
    parsed[row] = {}
    const validTop = (row-1 >= 0)
    const validBottom = (row+1 < rowLength)
    for(let col = 0; col < colLength; col++){
      parsed[row][col] = {}

      let validLeft = (col-1 >= 0) && 1
      let validRight = (col+1 < colLength) && 1 
      let temp_cur = input[row][col];
      
      parsed[row][col]["C"] = temp_cur
      let occupied_count = 0;
      if( validLeft && input[row][col-1] === "#"){
        occupied_count++;
      } 
      if ( validTop && input[row-1][col] === "#"){
        occupied_count++;
      }
      if ( validRight && input[row][col+1] === "#"){
        occupied_count++;
      }
      if ( validBottom && input[row+1][col] === "#"){
        occupied_count++;
      }
      if ( validLeft && validTop && input[row-1][col-1] === "#"){
        occupied_count++;
      }
      if ( validRight && validTop && input[row-1][col+1] === "#"){
        occupied_count++; 
      }
      if ( validLeft && validBottom && input[row+1][col-1] === "#"){
        occupied_count++;
      }
      if ( validRight && validBottom && input[row+1][col+1] === "#"){
         occupied_count++;
      }
      parsed[row][col]["ocount"] = occupied_count
      total_ocount += (temp_cur === "#")? 1: 0;
    }
  }
  return parsed
}

fs.readFile("./input.txt", (err, data) => {
  if (err) {
    console.log(err)
  } else {
    let input = data.toString().split("\n").flatMap(e => e.trim());

    console.log("Part1 initiated")
    /* Day 11 : Part 1 starts here */
    let p1 = input
    let curState = getAdjacent(p1)
    let prevState = 0
    
    while(JSON.stringify(prevState) !== JSON.stringify(curState)){
    for(let row = 0; row < p1.length; row++){
      for(let col = 0; col < p1[row].length; col++){
        if(curState[row][col].C === "."){
          continue;
        }
        if(curState[row][col].C === "L" && curState[row][col].ocount === 0){
          p1[row] = p1[row].substr(0, col) + '#' + p1[row].substr(col + 1);
        } else if(curState[row][col].ocount >= 4){
          p1[row] = p1[row].substr(0, col) + 'L' + p1[row].substr(col + 1);
        }
      }
    }
    prevState = curState
    curState = getAdjacent(p1)
  }

   console.log("Part1", total_ocount)
    /* Day 11 : Part 1 ends here */
  }
}) 