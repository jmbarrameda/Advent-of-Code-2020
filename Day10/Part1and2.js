/**
  Day 10: 

  Link: https://adventofcode.com/2020/day/10

  @author Jaycee Barrameda
  @version 1.0 12/10/2020

  In my honor, I assure that I have not given nor
  received any unauthorized help in this work.

                            Jaycee Barrameda

*/
const fs = require('fs');

const getCongruent = (input) => {
  let congruent = []
  let temp = []; 

  for(let i = 0; i < input.length-1; i++){
    temp.push(input[i])
    if(input[i+1]-input[i] !== 1){
      if(temp.length > 2){
        congruent.push(temp)
      }
      temp = []
    }
  }
  return (congruent)
}

const getCombination = ( n ) => {
  let f = [0, 1, 1]
  for(let i = 3; i <= n; i++){
    f[i] = f[i-1] + f[i-2] + f[i-3]
  }
  return f[n]
}

fs.readFile("./input.txt", (err, data) => {
  if (err) {
    console.log(err)
  } else {
    const input = data.toString().split("\n").flatMap(e => Number(e.trim()));
    const sorted = input.sort((a,b) => a-b)
    sorted.push(sorted[sorted.length-1] + 3)
    sorted.unshift(0)

    /* Day 10 : Part 1 starts here */
    const count_diff = sorted.reduce( (acc,cur,i,arr) => {
      if(arr[i+1]-cur === 1){
        return {...acc, "diff_1": acc["diff_1"] + 1}
      } else if (arr[i+1]-cur === 2) {
        return {...acc, "diff_2": acc["diff_3"] + 1}
      } else if (arr[i+1]-cur === 3) {
        return {...acc, "diff_3": acc["diff_3"] + 1}
      } else {
        return acc;
      }
    } , { diff_1: 0, diff_2: 0, diff_3: 0 })

    console.log("Part1", count_diff.diff_1 * count_diff.diff_3)    
    /* Day 10 : Part 1 ends here */

    /* Day 10 : Part 2 starts here */
    const congruent = getCongruent(sorted)
    const p2 = congruent.reduce( (acc, cur) => acc * getCombination(cur.length), 1)
    console.log("Part2", p2)
    /* Day 10 : Part 2 ends here */
  }
}) 