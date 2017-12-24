import keys from './inputs/day21'
// const keys = {default: `../.# => ##./#../...
// .#./..#/### => #..#/..../..../#..#`}

let correspondenceMap = keys.default.split("\n")
                        .map(x => x.split(" => ")
                          // .map(x => x.split("/")
                          //   .map(x => x.split(""))
                          // )
                        )

const input = ".#...####"

const flipXY = p => p[0].map((x,i) => p.map(x => x[i]))
const reverse = p => p.slice(0).reverse()
const asArray = s => s.split("/").map(x => x.split(""))
const asString = a => a.map(x => x.join("")).join("/")

const addPermutations = pattern => {
  let p = asArray(pattern.shift())
  let permutations = []
  for (let i = 0; i < 4; i++) {
    p = flipXY(p)
    permutations.push(asString(p))
    p = reverse(p)
    permutations.push(asString(p))
  }
  return permutations.concat(pattern)
}

correspondenceMap = correspondenceMap.map(x => addPermutations(x))

// correspondenceMap is usable!

const decompose = (input) => {
  let dimension = Math.sqrt(input.length)
  let chunkSize = dimension % 2 == 0 ? 2 : 3
  let grid = [], parsableChunks = []
  do{ grid.push(input.substring(0, dimension)) }
  while( (input = input.substring(dimension, input.length)) != "" );

  for (let cy = 0; cy < (dimension); cy += chunkSize) {
    for (let c = 0; c < dimension; c += chunkSize) {
      let chunk = []
      for (let y = 0; y < chunkSize; y++) {
        let chunkLine = []
        for (let x = 0; x < chunkSize; x++) {
          chunkLine.push(grid[y + cy][x + c])
        }
        chunk.push(chunkLine.join(""))
      }
      parsableChunks.push(chunk.join("/"))
    }
  }
  return parsableChunks
}

const recompose = (input) => {
  let chunks = input.map(x => x.split("/"))
  let chunkSize = chunks[0].length
  let chunksPer = Math.sqrt(chunks.length)
  let grid = ""

  for (let cl = 0; cl < chunksPer; cl++) { // for each line of chunks (3)
    for (let y = 0; y < chunkSize; y++) { // Pick a Y value (0 -> 3 per line)
      for (let c = 0; c < chunksPer; c++) { // Then for each chunk
        grid = grid.concat(chunks[c + (cl * chunksPer)][y])
      }
    }
  }
  return grid
  }

const match = (input) => {
  let result = false
  let len = input.length
  for (let i = 0; i < correspondenceMap.length && !result; i++) {
    if (correspondenceMap[i][0].length == len && !result) {
      for (let j = 0; j < correspondenceMap[i].length - 1; j++) {
        if (input === correspondenceMap[i][j]) {
          result = correspondenceMap[i][correspondenceMap[i].length - 1]
        }
      }
    }
  }
  return [result]
}

const step = (input) => {
  let chunks = decompose(input), results = []
  chunks.forEach(x => {
    results = results.concat(match(x))
  })
  return recompose(results)
}

let art = input

for (let i = 0; i < 5; i++) {
  console.time("Part time for " + i)
  art = step(art)
  console.timeEnd("Part time for " + i)
}

console.log("Part 1: ", (art.match(/#/g)||[]).length)

for (let i = 0; i < 13; i++) {
  // Just brute-force. Very clever.
  // It took 56 minutes on one thread.
  // http://i.imgur.com/ARCmTHP.png

  console.time("Part time for " + i)
  art = step(art)
  console.timeEnd("Part time for " + i)
}

console.log("Part 2: ", (art.match(/#/g)||[]).length)
