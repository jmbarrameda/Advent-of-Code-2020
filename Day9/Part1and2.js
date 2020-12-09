/**
  Day 9: Encoding Error

  Link: https://adventofcode.com/2020/day/9

  @author Jaycee Barrameda
  @version 1.0 12/09/2020

  In my honor, I assure that I have not given nor
  received any unauthorized help in this work.

                            Jaycee Barrameda

*/
const fs = require('fs');

const hashMe = (input) => {
  let obj = {}
  for(let i = 0; i < input.length; i++){
    obj[input[i]] = i;
  }
  return obj
}

const findPair = (target, preamble) => {
  let hash = hashMe(preamble)

  const found = preamble.some((cur, i) => {
    let diff = target - cur;
    return (diff in hash && i !== hash[diff])
  })
  return found
}

const check = (input, n_preamble = 5) => {
  let invalid_no = 0;
  for(let i = n_preamble; i < input.length; i++){
    const preamble = input.slice(i-n_preamble,i);
    const found = findPair(input[i], preamble)
    if(!found){
      invalid_no = input[i] 
      break;
    }
  }
  return invalid_no;
}

const filterObj = (input, p1) => {
  const filtered = Object.keys(input).filter(e => e < p1);

  let obj = {}
  for(let i = 0; i < filtered.length; i++){
    obj[filtered[i]] = input[filtered[i]]
  }
  return obj;
}

fs.readFile("./input.txt", (err, data) => {
  if (err) {
    console.log(err)
  } else {
    const input = data.toString().split("\n").flatMap(e => Number(e.trim()));
    
    
    /* Day 9 : Part 1 starts here */
    const p1 = check(input, 25)
    console.log("Part1:", p1)
    /* Day 9 : Part 1 ends here */

    /* Day 9 : Part 2 starts here */
    const hashedInput = hashMe(input)
    const setLessThanP1 = filterObj(hashedInput, p1)
    const indices = Object.values(setLessThanP1).sort((a,b) => a-b)

    let sum = 0;
    let temp_list = [];
    let last_iter = 0;

    for(let i = indices[0], j = 0; j < indices.length; j++, i = indices[j]){
      const cur = input[i]
      sum += cur;
      temp_list.push(cur)
      if(temp_list.length === 1){
        last_iter = j ;
      } else if(sum > p1){
        temp_list = [];
        sum = 0;
        j = last_iter;
      } else if(sum === p1){
        break;
      }
    }
    
    console.log("Part2:", Math.max(...temp_list) + Math.min(...temp_list))
    /* Day 9 : Part 2 ends here */
  }
}) 