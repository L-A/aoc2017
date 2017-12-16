import input from "./inputs/day16"

const programs = "abcdefghijklmnop".split("")
const instructions = input.default.split(",").map(line => [line.charAt(0), ...line.substr(1).split("/")])

const swap = (arr, i1, i2) => {
  let a = arr.slice(0)
  const val1 = a[i1], val2 = a[i2]
  a[i1] = val2
  a[i2] = val1
  return a
}

const runDance = (programs, instructions) => {
  let p = programs.slice(0)

  instructions.forEach((line) => {
    if (line[0] == "x") {
      p = swap(p, line[1], line[2])
    } else if (line[0] == "p") {
      p = swap(p, p.indexOf(line[1]), p.indexOf(line[2]))
    } else {
      p = p.slice(p.length - line[1]).concat(p.slice(0, p.length - line[1] ))
    }
  })

  return p
}

// Part 1
console.log(runDance(programs, instructions).join(""))

let lineup = programs.slice(0), outcomes = []

// Get the cycle length
while (outcomes.indexOf(lineup.join("")) == -1) {
  outcomes.push(lineup.join(""))
  lineup = runDance(lineup, instructions)
}

// Run for the remainder of cycles leading to 1b
for (let i = 0; i < (1000000000 % outcomes.length); i++) {
  lineup = runDance(lineup, instructions)
}

// Part 2
console.log(lineup.join(""))
