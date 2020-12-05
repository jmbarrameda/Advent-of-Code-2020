/**
  Day 5: Binary Boarding

  Link: https://adventofcode.com/2020/day/5

  @author Jaycee Barrameda
  @version 1.0 12/05/2020

  In my honor, I assure that I have not given nor
  received any unauthorized help in this work.

                            Jaycee Barrameda

*/
const fs = require('fs'); 

const check = (stack, min, max) => {
  const letter = stack.slice(0, 1);
  stack = stack.slice(1,stack.length)

  if(stack.length === 0 || min === max ){
    if(letter === "F" || letter === "L"){ return min; } 
    else if(letter === "B" || letter === "R"){ return max; }
  }
  if(letter === "F" || letter === "L"){
    max = parseInt((max+min)/2)
    return(check(stack, min, max))
  } 
  if(letter === "B" || letter === "R"){
    min = parseInt(Math.ceil((max+min)/2))
    return(check(stack, min, max ))
  }
}

fs.readFile("./input.txt", (err,data) => { 
  if(err){ 
    console.log(err)    
  } else { 
    const input = data.toString().split("\n").map(e=>e.trim());

    const SeatIdList = input.map( (seat) => {
      const row = seat.slice(0,7)
      const column = seat.slice(-3)
      const rown = check(row, 0, 127)
      const coln = check(column, 0, 7)
      const seatID = rown*8+coln
      
      return seatID
    })

    /* Part 2 */
    const sortedList = SeatIdList.sort()
    let myId = sortedList.filter( (id, i, arr) => id+2 === arr[i+1])[0] + 1;
    /* End of Part 2 */

    console.log("Part1", Math.max(...SeatIdList))
    console.log("Part2", myId)
  } 
}) 