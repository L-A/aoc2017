// Part 1

import input from "./inputs/day5"

let data = input.slice(0)

let position = 0, steps = 0

while (position < data.length) {
  let movement = data[position]
  data[position] += 1
  position += movement
  steps ++
}

console.log(steps)

// Part 2

data = input.slice(0)
position = 0, steps = 0

while (position < data.length) {
  let movement = data[position]
  if (movement >= 3) {
    data[position] -= 1
  } else {
    data[position] += 1
  }
  position += movement
  steps ++
}

console.log(steps)
