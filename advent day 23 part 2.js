// Part 2

let a = 1, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0

for (let i = 106500; i <= 123500; i += 17) { // A
  d = 2
  do { // C
    d++
  } while (i % d !== 0) // ← C
  if (i !== d) { h++ }
}

console.log(h)
