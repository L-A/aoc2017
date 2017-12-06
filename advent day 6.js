// Input

const input = [2, 8, 8, 5, 4, 2, 3, 1, 5, 5, 1, 2, 15, 13, 5, 14]

// Helpers

const cycle = (index, steps, length) => {
  return index + steps - (index + steps >= length ? length : 0);
}

const indexOfLargest = (array) => {
  let result = 0, currentMax = 0
  array.forEach((value, index) => {
    if (value > currentMax) {
      result = index
      currentMax = value
    }
  })
  return result
}

// Part 1

let duplicate = ""

const loopsUntilDuplicate = (input) => {
  let generatedPrints = [], cycles = 0, print = -1
  let manipulatedInput = input.slice(0)

  while (generatedPrints.indexOf(print) == -1) {
    generatedPrints.push(print)

    let position = indexOfLargest(manipulatedInput)
    let valueToDistribute = manipulatedInput[position]
    manipulatedInput[position] = 0

    while (valueToDistribute > 0) {
      position = cycle(position, 1, manipulatedInput.length)
      manipulatedInput[position]++
      valueToDistribute--
    }

    print = manipulatedInput.join(",")
    cycles++
  }

  duplicate = manipulatedInput
  return cycles
}

console.log(loopsUntilDuplicate(input))

// Part 2
// (I've mainly inserted the "duplicate" lines in part 1)

console.log(loopsUntilDuplicate(duplicate) - 1)
