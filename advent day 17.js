const input = 386

const spin = (steps, limit) => {
  let result = [0], position = 0

  for (let i = 1; i <= limit; i++) {
    position = (steps + position) % result.length + 1
    result.splice(position, 0, i)
  }

  return result
}

// Part 1
const spinResult = spin(input, 2017)
console.log(spinResult[spinResult.indexOf(2017) + 1])


const afterZero = (steps, limit) => {
  let position = 0, val = 0

  for (let i = 1; i <= limit; i++) {
    position = ((steps + position) % i) + 1
    if (position === 1) {val = i}
  }

  return val
}

// Part 2

console.log(afterZero(input, 50000000))
