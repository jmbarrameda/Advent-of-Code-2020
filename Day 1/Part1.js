const fs = require('fs'); 
fs.readFile("./input.txt", (err,data) => { 
  if(err){ 
    console.log(err)    
  } else { 
    const input = data.toString().trim().split("\n").map(x=>+x);
    arr = input.flatMap( (e) => {
        return input.includes(2020-e) ? (2020-e)*e : [];
      })
      var ans = Math.max(...arr)
      console.log(ans)
  } 
}) 