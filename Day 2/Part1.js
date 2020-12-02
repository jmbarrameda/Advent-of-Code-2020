const fs = require('fs'); 

fs.readFile("./input.txt", (err,data) => { 
  if(err){ 
    console.log(err)    
  } else { 
    const input = data.toString().trim().split("\n");
    let valid = 0;
    const parsed = input.map(e => {
        const parsed = e.split(" ")

        const data = { low: Number(parsed[0].split("-")[0]),
                    high: Number(parsed[0].split("-")[1]),
                    letter: parsed[1][0],
                    password: parsed[2] }

        const count = (data.password.split(data.letter).length-1);

        if ( data.low <= count && count <= data.high){
            valid++
        }
    })
    console.log(valid)
  } 
}) 