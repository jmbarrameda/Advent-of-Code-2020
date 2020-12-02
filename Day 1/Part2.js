const fs = require('fs'); 
fs.readFile("./input.txt", (err,data) => { 
  if(err){ 
    console.log(err)    
  } else { 
    const input = data.toString().trim().split("\n").map(x=>+x);
    arr = input.flatMap( (x) => {
        const z = 2020-x;
        const arr2 = input.flatMap( (y) => {
          return input.includes(z-y) ? y*x*(z-y) : [];
        })
        return arr2
      })     
      var ans = Math.max(...arr)
      console.log(ans)
  } 
}) 