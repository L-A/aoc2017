const inputA = 634, inputB = 301
// const inputA = 65, inputB = 8921

const binary = (num) => {
  return "0000000000000000".concat(num.toString(2)).slice(-16)
}

function *generator (input, factor) {
  let value = input
  while (true) {
    value = (value * factor) % 2147483647
    yield value
  }
}

let genA = generator(inputA, 16807)
let genB = generator(inputB, 48271)

let count = 0

for (let i = 0; i < 40000000; i++) {
  if (binary(genA.next().value) == binary(genB.next().value)) count++
}

// part 1
console.log(count)

function *pickyGenerator (multiple, input, factor) {
  let value = input
  while (true) {
    do {
      value = (value * factor) % 2147483647
    } while (value % multiple != 0)
    yield value
  }
}

// part 2
let pickyGenA = pickyGenerator(4, inputA, 16807)
let pickyGenB = pickyGenerator(8, inputB, 48271)

let pickyCount = 0

for (let i = 0; i < 5000000; i++) {
  if (binary(pickyGenA.next().value) == binary(pickyGenB.next().value)) pickyCount++
}

console.log(pickyCount)
