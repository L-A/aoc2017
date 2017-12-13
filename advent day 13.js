import input from "./inputs/day13"

let severity = (array, startingTime, allowZero = true) => {
  let total = 0
  input.default.split("\n").map((line) => {
    let value = line.split(': ').map(a => parseInt(a))
    if ((value[0] + startingTime) % ((value[1] - 1) * 2) === 0) {
      total += (value[0] * value[1])
      total += allowZero ? 0 : 1
    }
  })
  return total
}

// Part 1
console.log(severity(input, 4))

// Part 2
let cleanTiming = -1
let attempt = 0

while (cleanTiming == -1 && attempt <= 4000000) {  /* just in case */
  attempt++
  if (severity(input, attempt, false) == 0) { cleanTiming = attempt }
}

console.log(cleanTiming, attempt)
