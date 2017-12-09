// [ 'js', 'inc', '542', 'if', 'cn', '!=', '2741' ]

import input from "./inputs/day8"

let register = {}
let totals = []

let parsedInput = input.default.split('\n').map((line) => {
  let values = line.split(" ")
  new Array(values[0], values[4]).forEach((val) => {if (!(val in register)) {register[val] = 0}})
  return {
    valueName: values[0],
    shift: values[2] * (values[1] == "inc" ? 1 : -1),
    toEval: "register['" + values[4] + "'] " + values[5] + values[6]
  }
})

// Part 1
console.log(register) // Totally inspectable! The total register is ~20 different entries

parsedInput.forEach((line) => {
  if (eval(line.toEval)) {
    register[line.valueName] += line.shift
    totals.push(register[line.valueName])
  }
})

// Part 2
console.log(Math.max.apply(null, totals))
