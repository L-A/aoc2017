let infectionCount = 0
import input from './inputs/day22'

// let input = {default:`..#
// #..
// ...`}

let grid = {
  map: {},
  center: {x: 12, y: 12},
  nodeAt (x, y) {
    // Any node can exist and starts as false if not already defined
    if (!this.map.hasOwnProperty(y)) { this.map[y] = {} }
    if (!this.map[y].hasOwnProperty(x)) { this.map[y][x] = false }
    return this.map[y][x]
  },
  setNodeAt (x, y, val) {
    if (!this.map.hasOwnProperty(y)) { this.map[y] = {} }
    this.map[y][x] = val
  },
  flipNode (x, y) {
    if (!this.map[y][x]) { infectionCount++ }
    this.map[y][x] = !this.map[y][x]
  },
  step2FlipNode (x, y) {
    let v = this.map[y][x]
    v = v == true ? "F" : v == "F" ? false : v == false ? "W" : true
    this.map[y][x] = v
    if (v == true) { infectionCount++ }
  },
  setupMap (input) {
    input.split("\n").forEach((line, y) => {
      let lineObject = {}
      line.split("").forEach((char, x) => {
        lineObject[x] = (char == "#")
      })
      this.map[y] = lineObject
    })
  },
}

let virus = {
  x: grid.center.x,
  y: grid.center.y,
  vx: 0,
  vy: -1,
  move () {
    this.x += this.vx
    this.y += this.vy
  },
  turn () {
    let vx = this.vx, vy = this.vy
    let val = grid.nodeAt(this.x, this.y)
    if (val == true) {
      this.vx = (vx ? 0 : vy > 0 ? -1 : 1)
      this.vy = (vy ? 0 : vx > 0 ? 1 : -1)
    } else if (val == false) {
      this.vx = (vx ? 0 : vy > 0 ? 1 : -1)
      this.vy = (vy ? 0 : vx > 0 ? -1 : 1)
    } else if (val == "F") {
      this.vx = -vx
      this.vy = -vy
    }
  },
}

const step = (amount) => {
  while (amount > 0) {
    virus.turn()
    grid.flipNode(virus.x, virus.y)
    virus.move()
    amount --
  }
}

const stepAdvanced = (amount) => {
  while (amount > 0) {
    virus.turn()
    grid.step2FlipNode(virus.x, virus.y)
    virus.move()
    amount --
  }
}

grid.setupMap(input.default)

// step(10000)
stepAdvanced(10000000)
console.log(infectionCount)
