import input from "./inputs/day4"

// Self-explanatory name
const hasDuplicateWords = (string) => {
  return string.split(" ").some((word, index, array) => {
    if (array.indexOf(word) != -1 && array.indexOf(word) != index) { return true }
    return false
  })
}

// Self-explanatory name, part deux
const removeDuplicates = (arrayOfStrings) => {
  return arrayOfStrings.filter((phrase) => {
    return (!hasDuplicateWords(phrase))
  })
}

let goodPhrases = removeDuplicates(input)

console.log(goodPhrases.length) // 386

// Part 2

// Order all letters in each word!
// Creates an identical "fingerprint" for anagrams whatever the order.

const letterSortedWords = goodPhrases.map((phrase) => {
  return phrase.split(" ").map((word) => {
    return word.split("").sort().join("")
  }).join(" ")
})

// Joining the arrays back into a string is super inefficient,
// but I'd like to just reuse my previous filter, like so:

let noAnagrams = removeDuplicates(letterSortedWords)

console.log(noAnagrams.length) // 208
