const map = require('fs').readFileSync("./inputs/day19.txt").toString().split("\n")

// Well, this is messy.

let coordinates = [0, map[0].indexOf("|")],
direction = [1, 0],
steps = 0,
letters = []

const move = (c, dir, letters) => {
  do {
    if (charAt(c).charCodeAt(0) > 64 && charAt(c).charCodeAt(0) < 91) {
      letters.push(charAt(c))
    }
    if (charAt(c) == " ") { return false }
    c = [c[0] + dir[0], c[1] + dir[1]]
    steps++
  } while (charAt(c) != "+")
  return c
}

const charAt = (c) => {
  if (!c) { return false }
  // If it's out of bounds, just treat it like a space
  if (c[0] < 0 || c[1] < 0) { return " " }
  if (c[0] >= map.length || c[1] >= map[c[0]].length) { return " " }
  return map[c[0]][c[1]]
}

const testDirection = (c, dir) => {
  let soughtGlyph = (dir[0] != 0) ? "|" : "-"
  while (charAt(c) != " ") {
    c = [c[0] + dir[0], c[1] + dir[1]]
    if (charAt(c) == soughtGlyph) {
      return true
    }
  }
  return false
}

let findNewDirection = (c, dir) => {
  if (dir[0] != 0) {
    if (testDirection(c, [0, 1])) { return [0, 1] }
    else if (testDirection(c, [0, -1])) { return [0, -1] }
    else { return false }
  } else if (dir[1] != 0) {
    if (testDirection(c, [1, 0])) { return [1, 0] }
    else if (testDirection(c, [-1, 0])) { return [-1, 0] }
    else { return false }
  }
}

let solve = (map, c, dir) => {
  c = move(c, dir, letters)
  dir = findNewDirection(c, dir)
  if (c == false) {
    return letters.join("")
  }
  return solve(map, c, dir)
}

// Part 1
console.log(solve(map, coordinates, direction, letters))

// Part 2
console.log(steps)
