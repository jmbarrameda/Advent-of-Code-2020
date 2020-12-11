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
const getAdjacent = (input) => {
  let parsed = {}  
  total_ocount = 0;
  let colLength = Object.keys(input[0]).length;

  for(let row = 0; row < input.length; row++){
    parsed[row] = {}
    
    for(let col = 0; col < colLength; col++){
      const len = colLength;
      const cur = input[row][col]
      parsed[row][col] = {}
      
      let occupied_count = 0;
      //check right
      for(let i = col+1; i < len; i++){
        if(input[row][i] === "#"){ occupied_count++; break; }
        else if(input[row][i] === "L"){ break; }
      }
      //check left
      for(let i = col-1; i >= 0; i--){
        if(input[row][i] === "#"){ occupied_count++; break; }
        else if(input[row][i] === "L"){ break; }
      }
      //check top
      for(let i = row-1; i >= 0; i--){
        if(input[i][col] === "#"){ occupied_count++; break; }
        else if(input[i][col] === "L"){ break; }
      }
      //check bottom
      for(let i = row+1; i < len; i++){
        if(input[i][col] === "#"){ occupied_count++; break; }
        else if(input[i][col] === "L"){ break; }
      }
      //check top left
      for(let i = row-1, j = col -1; i >= 0 && j >= 0; i--, j--){
        if(input[i][j] === "#"){ occupied_count++; break; }
        else if(input[i][j] === "L"){ break; }
      }
      //check top right
      for(let i = row-1, j = col + 1; i >= 0 && j < len; i--, j++){
        if(input[i][j] === "#"){ occupied_count++; break; }
        else if(input[i][j] === "L"){ break; }
      }
      //check bottom right
      for(let i = row+1, j = col + 1; i < len && j < len; i++, j++){
        if(input[i][j] === "#"){ occupied_count++; break; }
        else if(input[i][j] === "L"){ break; }
      }
      //check bottom left
      for(let i = row+1, j = col - 1; i < len && j >= 0; i++, j--){
        if(input[i][j] === "#"){ occupied_count++; break; }
        else if(input[i][j] === "L"){ break; }
      }

      parsed[row][col]["C"] = cur
      parsed[row][col]["ocount"] = occupied_count

      total_ocount += (cur === "#")? 1: 0;
    }
  }
  return parsed
}

fs.readFile("./input.txt", (err, data) => {
  if (err) {
    console.log(err)
  } else {
    let input = data.toString().split("\n").flatMap(e => e.trim());
    //console.log(input)
  
    console.log("Part2 initiated")
    /* Day 11 : Part 1 starts here */
    let p2 = input
    curState = getAdjacent(p2, 1)
    prevState = 0

    while(JSON.stringify(prevState) !== JSON.stringify(curState)){
    for(let row = 0; row < p2.length; row++){
      for(let col = 0; col < p2[row].length; col++){
        if(curState[row][col].C === "."){
          continue;
        }
        if(curState[row][col].C === "L" && curState[row][col].ocount === 0){
          p2[row] = p2[row].substr(0, col) + '#' + p2[row].substr(col + 1);
        } else if(curState[row][col].ocount >= 5){
          p2[row] = p2[row].substr(0, col) + 'L' + p2[row].substr(col + 1);
        }
      }

    }
    prevState = curState
    curState = getAdjacent(p2)
  }
  console.log("Part2", total_ocount)
    /* Day 11 : Part 2 ends here */

  }
}) 