import input from "./inputs/day18"
const instructions = input.default.split("\n").map(x => x.split(" "))

let register = {}

const v = (i) => {
  if (typeof i == "number") { return i }
  else if (typeof i == "string" && parseInt(i, 10)) { return i * 1 }
  else if (register.hasOwnProperty(i)) { return register[i] * 1 }
  return 0
}

const setv = (i, val) => {
  register[i] = v(val)
}

let received = false, pos = 0, played

while (!received && pos < instructions.length) {
  let line = instructions[pos]

  switch(line[0]) {
    case "set":
      setv(line[1], line[2])
    break

    case "add":
      setv(line[1], v(line[1]) + v(line[2]))
    break

    case "mul":
      setv(line[1], v(line[1]) * v(line[2]))
    break

    case "mod":
      setv(line[1], v(line[1]) % v(line[2]))
    break

    case "jgz":
      if (v(line[1]) > 0) { pos += v(line[2]) - 1 }
    break

    case "snd":
      played = v(line[1])
    break

    case "rcv":
      if (v(line[1]) != 0) {
        console.log("Played " + played)
        received = true
      }
    break
  }
  pos++
}

// There!
console.log(played)
