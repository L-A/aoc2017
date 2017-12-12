import input from "./inputs/day11"

let list = input.default.split(",")

const simplifyAxis = (array, dirA, dirB, composite = false) => {
  let result = array.slice(0)
  while (result.indexOf(dirA) != -1 && result.indexOf(dirB) != -1) {
    result.splice(result.indexOf(dirA), 1)
    result.splice(result.indexOf(dirB), 1)
    if (composite) { result.push(composite) }
  }
  return result
}

const trimDirections = (dirs) => {
  let initialLength = dirs.length,
      i = 0,
      result = dirs.slice(0).sort()

  // lol
  result = simplifyAxis(result, "n", "s")
  result = simplifyAxis(result, "se", "nw")
  result = simplifyAxis(result, "sw", "ne")
  result = simplifyAxis(result, "sw", "se", "s")
  result = simplifyAxis(result, "nw", "ne", "n")
  result = simplifyAxis(result, "ne", "s", "se")
  result = simplifyAxis(result, "se", "n", "ne")
  result = simplifyAxis(result, "nw", "s", "sw")
  result = simplifyAxis(result, "sw", "n", "nw")

  return initialLength > result.length ? trimDirections(result) : result
}

console.log(trimDirections(list).join(','))
console.log(trimDirections(list).length)

// Part 2

let maxDistance = 0, composedList = []
list.forEach((dir) => {
  composedList.push(dir)
  composedList = trimDirections(composedList)
  if (composedList.length > maxDistance) { maxDistance = composedList.length }
})

console.log("Max distance: " + maxDistance)
