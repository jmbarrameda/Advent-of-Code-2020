/**
  Day 4: Passport Processing

  Link: https://adventofcode.com/2020/day/4

  @author Jaycee Barrameda
  @version 1.0 12/04/2020

  In my honor, I assure that I have not given nor
  received any unauthorized help in this work.

                            Jaycee Barrameda

*/

const fs = require('fs'); 

const isBetween = (x, min, max) => {
  return x >= min && x <= max;
}

const isValidEyeColor = (color) => {

  switch(color){
    case "amb":
      return true;
    case "blu":
      return true;
    case "brn":
      return true;
    case "gry":
      return true;
    case "grn":
      return true;
    case "hzl":
      return true;
    case "oth":
      return true;
    default:
      return false;
  }

}

const validator = (field) => (data) => {
  const n_data = Number(data);
  switch(field){
    case "byr":
      if(isBetween(n_data, 1920, 2002) && data.length === 4){
        return true;
      }
      break;
    case "iyr":
      if(isBetween(n_data, 2010, 2020) && data.length === 4){
        return true;
      }
      break;
    case "eyr":
      if(isBetween(n_data, 2020, 2030) && data.length === 4){
        return true;
      }
      break;
    case "hgt":
      const hgt = Number(data.match(/\d+/g)[0])
      const unit = data.slice(-2);
      if(unit === "cm"){
        if(isBetween(hgt, 150, 193)){
          return true;
        }
      } else if(unit === "in"){
        if(isBetween(hgt, 59, 76)){
          return true;
        }
      }
      break;
    case "hcl":
      var re = /[0-9A-Fa-f]{6}/g;
      if(re.test(data) && data[0] === '#') {
        return true;
      }
      break;
    case "ecl":
      if(isValidEyeColor(data)){
        return true;
      }
      break;
    case "pid":
      var re = /^\d{9}$/;
      if(re.test(data)){
        return true;
      }
      break;
    case "cid":
      return true;
    default:
      return false;
  }
}

fs.readFile("./input.txt", (err,data) => { 
  if(err){ 
    console.log(err)    
  } else { 
    const input = data.toString().split("\n\r").map(e=>e.trim());
    
    const passport_fields = ["byr","iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

    const valid_count = input.reduce( (acc, cur, i) => {
      if( passport_fields.every( field => {return input[i].includes(field)}) ){

        const parsed = input[i].split("\r").join("").split("\n").join(" ").split(" ");
        
        const p_fields = parsed.reduce((acc,cur,i) => {
          const current_field = cur.split(":");
          if(validator(current_field[0])(current_field[1])){
            return acc+1;
          } else {
            return acc;
          }
        }, 0)

        if(p_fields == parsed.length){
          return acc + 1;
        } 
        return acc;
      }
      else{
        return acc;
      }
    }, 0)

    console.log(valid_count)
  } 
}) 