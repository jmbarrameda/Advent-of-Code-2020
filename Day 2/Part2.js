const fs = require('fs'); 

fs.readFile("./input.txt", (err,data) => { 
  if(err){ 
    console.log(err)    
  } else { 
    const input = data.toString().trim().split("\n");
    let validcount = 0;
    const parsed = input.map(e => {
        const parsed = e.split(" ")

        const data = { low: Number(parsed[0].split("-")[0]),
                    high: Number(parsed[0].split("-")[1]),
                    letter: parsed[1][0],
                    password: parsed[2] }

        //const count = (data.password.split(data.letter).length-1);

        let valid = false;
        if ( data.password[data.low-1] === data.letter || data.password[data.high-1] === data.letter){
            valid = true;
        }
        if ( data.password[data.low-1] === data.letter && data.password[data.high-1] === data.letter){
            valid = false;
        }
        if (valid){
            validcount++;
        }
    })
    console.log(validcount)
  } 
}) 