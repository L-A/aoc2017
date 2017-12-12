import input from "./inputs/day12"

let programs = input.default.split("\n").map((line) => {
  const source = line.split(' <-> ')
  return {
    connexions: source[1].split(", ")
  }
})

const addAllConnexions = (programs, connexion, connexions = new Set()) => {
  connexions.add(connexion)
  for (let c of programs[connexion].connexions.filter(_c => !connexions.has(_c))) {
    addAllConnexions(programs, c, connexions)
  }
  return connexions
}

// Part 1
const rootGroup = addAllConnexions(programs, "0")
console.log(rootGroup.size)

let accountedForPrograms = rootGroup // Might as well
let noOfGroups = 1

for (let i = 0; i < 2000; i++) {
  if ( !accountedForPrograms.has(i.toString()) ) {
    accountedForPrograms = new Set([... accountedForPrograms, ...addAllConnexions(programs, i.toString())])
    noOfGroups++
  }
}

// Part 2
console.log(noOfGroups)
