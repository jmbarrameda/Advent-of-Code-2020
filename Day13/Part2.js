/**
  Day 13: Shuttle Search

  Link: https://adventofcode.com/2020/day/13

  @author Jaycee Barrameda
  @version 1.0 12/13/2020

  In my honor, I assure that I have not given nor
  received any unauthorized help in this work.

                            Jaycee Barrameda

*/
const fs = require('fs');

//CRT Theorem (c) geeksforgeeks
const inv = (a , m) => {
  let m0 = m, t, q; 
  let x0 = BigInt(0), x1 = BigInt(1); 
      
  if (m === 1) 
    return 0; 
      
  // Apply extended Euclid Algorithm 
  while (a > 1){ 
    // q is quotient 
    q = a / m; 
    t = m; 
    // m is remainder now, process 
    // same as euclid's algo 
    m = a % m;
    a = t; 
    t = x0; 
    x0 = x1 - q * x0; 
    x1 = t; 
  } 

  // Make x1 positive 
  if (x1 < 0) 
  x1 += m0; 

  return BigInt(x1);
}

const findMinX = (num, rem) => { 
    let k = num.length
    // Compute product of all numbers 
    let prod = BigInt(1); 
    for (let i = 0; i < k; i++) 
        prod *= num[i]; 
  
    // Initialize result 
    let result = BigInt(0); 
  
    // Apply above formula 
    for (let i = 0; i < k; i++) 
    { 
        let pp = prod / num[i]; 
        result += rem[i] * inv(pp, num[i]) * pp; 
    } 
  
    return result % prod;
}

fs.readFile("./input.txt", (err, data) => {
  if (err) {
    console.log(err)
  } else {
    const input = data.toString().split("\n").flatMap(e => e.trim());
    const list = input[1].split(",")

    /* Day 13 : Part 1 starts here */
    let rem = list.reduce( (acc,cur,i) => (cur === 'x') ? acc : [...acc, (i === 0) ? BigInt(i) : ((BigInt(cur)-BigInt(i)) < 0) ? BigInt(cur)+(BigInt(cur)-BigInt(i))%BigInt(cur) : BigInt(cur)-BigInt(i)], [])
    const bus_list = list.reduce( (acc, cur) => (/\d+/g).test(cur) ? [...acc, BigInt(cur)] : acc, [])
    const min = findMinX(bus_list, rem)
    console.log("Part 2:", min)
    /* Day 13 : Part 1 ends here */
  }
}) 