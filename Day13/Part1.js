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

fs.readFile("./input.txt", (err, data) => {
  if (err) {
    console.log(err)
  } else {
    const input = data.toString().split("\n").flatMap(e => e.trim());
    const depart = Number(input[0])
    const bus_list = input[1].split(",").reduce( (acc, cur) => (/\d+/g).test(cur) ? [...acc, Number(cur)] : acc, [])

    /* Day 13 : Part 1 starts here */
    const ts = bus_list.reduce( (acc, bus) => ( ((parseInt(depart/bus)+1)*bus)>depart) ? [...acc,(parseInt(depart/bus)+1)*bus] : [...acc,0], [])
    const min_ts = Math.min(...ts)
    console.log("Part1", (min_ts-depart) * bus_list[ts.indexOf(min_ts)])
    /* Day 13 : Part 1 ends here */
  }
}) 