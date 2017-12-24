import input from "./inputs/day24"

const pieces = input.default.split("\n").map(x => x.split("/").map(x => x * 1))

const matchNextPieces = (val, pieces) => {
  let results = []
  for (let i = 0; i < pieces.length; i++) {

    if (pieces[i].indexOf(val) != -1) {
      results.push(i)
    }
  }
  if (results.length == 0) { return false }
  else { return results }
}

const extendBridge = (pieces, newPieceIndex, bridge, bridges) => {
  let p = pieces.slice(0)
  let b = bridge.slice(0)

  let bridgeEnd = p[newPieceIndex]
  if (b[b.length - 1][1] !== bridgeEnd[0]) { bridgeEnd.reverse() }
  b = bridge.concat(p.splice(newPieceIndex, 1))

  let extensions = matchNextPieces(bridgeEnd[1], p)
  if (!extensions) { bridges.push(
    {
      bridge: b,
      value: b.reduce((a, i) => a + i[0] * 1 + i[1] * 1, 0),
      length: b.length
    }
  ) }
  else {
    extensions.forEach((i) => {
      extendBridge(p, i, b, bridges)
    })
  }
}

const buildBridges = (pieces) => {
  let p = pieces.slice(0),
      bridges = []

  matchNextPieces(0, p).forEach((i) => {
    extendBridge(p, i, [[0,0]], bridges)
  })
  return bridges
}

let bridges = buildBridges(pieces)

let max = 0, maxLength = 0, longestIndex = false
bridges.forEach((b, i) => {
  if (b.length >= maxLength && b.value > max) {
    maxLength = b.length
    longestIndex = i
  }
  if (b.value > max) { max = b.value }
})

console.log("Maximum value:", max)
console.log("Longest bridge (" + bridges[longestIndex].length + " long):", bridges[longestIndex].value)
