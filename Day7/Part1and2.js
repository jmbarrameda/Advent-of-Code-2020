/**
  Day 7: Handy Haversacks

  Link: https://adventofcode.com/2020/day/7

  @author Jaycee Barrameda
  @version 1.0 12/07/2020

  In my honor, I assure that I have not given nor
  received any unauthorized help in this work.

                            Jaycee Barrameda

*/
const fs = require('fs'); 

// returns an object with character count eg.( abcbcc => { a:1, b:2, c:3} )
const parse = (input) => {
  let master = {}
  input.forEach(rule => {
    const parse = rule.split(/contain/)
    parse[0] = parse[0].split(" ").join("")
    const current = parse[0].replace(/bags|bag/g, '').trim()

    let children = {}
    const re = /\d+/g;

    if(re.test(parse[1])) {
      const bags = parse[1].split(",");
      for(let i = 0; i < bags.length; i++){
        let value = Number(bags[i].match(re)[0])
        bags[i] = bags[i].replace(re, '')
        bags[i] = bags[i].split(" ").join("")
        bags[i] = bags[i].replace(/bags|bag/g, '').trim()
      
        var child = bags[i]
        children[child] =  value;
      }  
    }
    master[current] = children
  })
  return master;
}

let master = {}
const checkChildren = ( current, children, traversed = []) => {  
   if (traversed.includes(current) ){
     return;
   }
   traversed.push(current)

   const grandchildren = children[current]
   for(let i = 0; i < Object.keys(grandchildren).length; i++){     
     child = Object.keys(grandchildren)[i]
     checkChildren(child, children, traversed)
   } 
   return traversed
}

let total = 0;
const checkBags = (current, prev_total = 1)=>{
  const current_children = master[current]

  let child_total = 0;
  let children_names = Object.keys(current_children)
  for(let i = 0; i < children_names.length; i++){
      const child = children_names[i]
      const child_n = current_children[child]

      child_total += (child_n * prev_total)
      checkBags(child, prev_total*child_n)
  }
  total += child_total
 
  return total
}


fs.readFile("./input.txt", (err,data) => { 
  if(err){ 
    console.log(err)    
  } else { 
    const input = data.toString().split(".").flatMap(e=> e.trim());
    master = parse(input) //put bags into object of objects
    const myBag = 'shinygold'

    /* Day 7 : Part 1 starts here */
    let sum = -1; // -1 kasi you need to minus shinygold 
    for(let i = 0; i < input.length; i++){
      const child = Object.keys(master)[i]
      const traversed = checkChildren(child, master, [])
      if(traversed.includes(myBag)){
        sum += 1;
      }
    }
    console.log("Part1", sum)
    /* Day 7 : Part 1 ends here */
    
    /* Day 7 : Part 2 starts here */
    const p2 = checkBags(myBag)
    console.log("Part2", p2)
    /* Day 7 : Part 2 ends here */
  } 
}) 