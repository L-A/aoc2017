import { hash } from './advent day 10'

const input = "ljoxqyyw"

const binaryHash = (input) => {
  return input.split("").map(x => "000".concat(parseInt(x.toString(), 16).toString(2)).slice(-4)).join('')
}

const grid = []

for (let i = 0; i < 128; i++) {
  grid[i] = binaryHash(hash(input + "-" + i)).split("")
}

const occupiedSquares = (input) => {
  let occupiedCount = 0
  for (let i = 0; i < 128; i++) {
    input[i].forEach(x => {
      if (x === "1") { occupiedCount++ }
    })
  }
  return occupiedCount
}

// Part 1 answer
console.log(occupiedSquares(grid))

const removeGroup = (grid, x, y) => {
  grid[y][x] = "0"
  if (x > 0   && grid[y][x-1] === "1") { removeGroup(grid, x-1, y) }
  if (x < 127 && grid[y][x+1] === "1") { removeGroup(grid, x+1, y) }
  if (y > 0   && grid[y-1][x] === "1") { removeGroup(grid, x, y-1) }
  if (y < 127 && grid[y+1][x] === "1") { removeGroup(grid, x, y+1) }
  return grid
}

const numberOfGroups = (input) => {
  let cleanMap = input.slice(0), count = 0
  input.forEach((row, y) => {
    row.forEach((character, x) => {
      if (cleanMap[y][x] === "1") {
        cleanMap = removeGroup(cleanMap, x, y)
        count ++
      }
    })
  })
  return count
}

console.log(numberOfGroups(grid))
