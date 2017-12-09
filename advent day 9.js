import input from "./inputs/day9"

let currentDepth = 0, total = 0, totalGarbage = 0;

const removeIgnoredChars = (array) => {
  for(let i = 0; i < array.length; i++) {
    if (array[i] == "!") {
      array.splice(i, 2)
      i --
    }
  }
  if (array.indexOf("!") != -1) {
    array = removeIgnoredChars(array)
  }
  return array
}

let filteredInput = removeIgnoredChars(input.default.split('')).join('').replace(/<(.*?)>/g, (p) => {
  totalGarbage += p.length-2
})

for (let char of filteredInput) {
  if (char == "{") { currentDepth++ }
  if (char == "}") { total += currentDepth-- }
}

console.log(total)
console.log(totalGarbage)
